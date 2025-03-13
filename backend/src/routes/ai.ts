import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { OpenAI } from 'openai';
import prisma from '../config/database';

// Add after the initial imports and router setup
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemMessage = {
  role: "system",
  content: "You are a helpful grocery shopping assistant. You can help with meal planning, nutritional advice, shopping tips, and answering questions about food storage and preparation. Please provide concise and practical answers."
};

router.post('/generate-list', authMiddleware, async (req, res) => {
  try {
    const { familySize, dietaryRestrictions, preferences, budget } = req.body;

    const prompt = `Generate a smart grocery list for a family of ${familySize} with the following details:
    ${dietaryRestrictions.length ? `Dietary restrictions: ${dietaryRestrictions.join(', ')}` : 'No dietary restrictions'}
    ${preferences.length ? `Preferences: ${preferences.join(', ')}` : ''}
    ${budget ? `Budget: $${budget}` : 'No specific budget'}
    
    Please provide:
    1. A list of recommended grocery items with quantities and reasons
    2. Smart suggestions for seasonal items and money-saving tips
    
    Format the response as a JSON object with 'items' and 'suggestions' arrays.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a smart grocery planning assistant that provides personalized shopping recommendations."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    res.json(response);
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

router.post('/save-list', authMiddleware, async (req, res) => {
  try {
    const { name, items, suggestions } = req.body;
    
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const aiList = await prisma.aIGeneratedList.create({
      data: {
        name: name,
        items: items as any,
        suggestions: suggestions as any,
        user: {
          connect: {
            id: req.userId
          }
        }
      },
    });

    res.json(aiList);
  } catch (error) {
    console.error('Error saving AI list:', error);
    res.status(500).json({ message: 'Failed to save AI list' });
  }
});

router.post('/shopping-list/:listId/items', authMiddleware, async (req, res) => {
  try {
    const { listId } = req.params;
    const { name, quantity } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // First verify the shopping list exists and belongs to the user
    const shoppingList = await prisma.shoppingList.findFirst({
      where: { 
        id: listId,
        userId: req.userId
      }
    });


    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping list not found or unauthorized' });
    }

    // Create item with all required fields
    const item = await prisma.shoppingItem.create({
      data: {
        name,
        quantity,
        checked: false, // Add default value
        shoppingListId: listId, // Direct relation instead of connect
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }).catch(err => {
      console.error('Prisma create error:', {
        name: err.name,
        code: err.code,
        meta: err.meta,
        message: err.message,
        stack: err.stack
      });
      throw err;
    });

    res.json(item);
  } catch (error) {
    console.error('Full error details:', {
      error
    });
    res.status(500).json({ 
      message: 'Failed to add item', 
      error
    });
  }
});

// Add this interface at the top of the file
interface ShoppingItemInput {
  name: string;
  quantity: string;
}

router.post('/shopping-list/:listId/items/batch', authMiddleware, async (req, res) => {
  try {
    const { listId } = req.params;
    const { items } = req.body as { items: ShoppingItemInput[] };

    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const shoppingList = await prisma.shoppingList.findFirst({
      where: { 
        id: listId,
        userId: req.userId
      }
    });

    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping list not found or unauthorized' });
    }


    const newItems = await prisma.shoppingItem.findMany({
      where: {
        shoppingListId: listId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: items.length,
    });

    res.json(newItems);
  } catch (error) {
    console.error('Batch creation error:', error);
    res.status(500).json({ message: 'Failed to add items', error });
  }
});

router.get('/generated-lists', authMiddleware, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const lists = await prisma.aIGeneratedList.findMany({
      where: {
        userId: req.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch AI generated lists' });
  }
});

router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...chatHistory,
        { role: "user", content: message }
      ],
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message;
    const responseContent = aiResponse.content || 'I apologize, but I could not generate a response.';

    // Save chat history to database
    await prisma.chatMessage.create({
      data: {
        content: message,
        role: 'user',
        userId: req.userId
      }
    });

    await prisma.chatMessage.create({
      data: {
        content: responseContent,
        role: 'assistant',
        userId: req.userId
      }
    });

    res.json({ message: responseContent });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

router.get('/chat-history', authMiddleware, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const messages = await prisma.chatMessage.findMany({
      where: {
        userId: req.userId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Failed to fetch chat history' });
  }
});

export default router;