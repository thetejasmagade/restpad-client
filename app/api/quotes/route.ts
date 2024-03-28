import { NextRequest, NextResponse } from "next/server";

const arr: Array<String> = [
  "Empower 💪 your projects with Restpad's REST API and efficient database.",
  "Just pick the dropdowns 🛻, and let Restpad handle the rest! ⚒️.",
  "Crafting APIs has never been simpler. Select 🤳, customize 🎨, done! 🎯.",
  "Restpad puts the power 🔥 of API creation in your hands. Simply choose your desired columns, and watch as Restpad generates a tailored API just for you. 💥",
  "Select, generate, done 🚀. Restpad makes API creation simple.",
  "Generate your next SAAS Projects API within seconds 🙌."
]

// Handles GET requests to /api/quotes
export async function GET(request: Request) {
  return NextResponse.json({ quote: arr[Math.floor(Math.random() * arr.length)]});
}
