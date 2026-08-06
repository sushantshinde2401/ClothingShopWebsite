# Decap CMS Setup

## Local Admin Test

1. Create a GitHub OAuth App in the GitHub account that owns this repo.
2. Use these values for local testing:
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `http://localhost:5173/api/callback`
3. Create `.env` in the project root:

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

4. Restart the dev server:

```bash
npm run dev
```

5. Open `http://localhost:5173/admin/`.

After login, the edit UI shows Products, Categories, Featured Collections, and Homepage.

## Vercel Production Setup

Create or update a GitHub OAuth App with:

- Homepage URL: `https://your-domain.com`
- Authorization callback URL: `https://your-domain.com/api/callback`

Add these environment variables in Vercel Project Settings:

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

Deploy again after adding the variables.

## Client Workflow

The client edits content at:

`https://your-domain.com/admin/`

They should use Products to add, edit, delete, upload images, change prices, manage sizes, manage stock, and toggle featured products.
