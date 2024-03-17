const arr = [
  "Empower 💪 your projects with Restpad's REST API and efficient database.",
  "Just pick the dropdowns, and let Restpad handle the rest!",
  "Restpad: Crafting APIs has never been simpler. Select, customize 🎨, done!",
  "Restpad puts the power of API creation in your hands. Simply choose your desired columns, and watch as Restpad generates a tailored API just for you.",
  "Select, generate, done 🚀. Restpad makes API creation simple.",
  "Generate your next SAAS Projects API within seconds 🙌"
]


export async function GET() {
  return arr[Math.floor(Math.random() * arr.length)]
}