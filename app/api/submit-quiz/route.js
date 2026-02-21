import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { answers, questions, level, skill, xpReward } = await request.json()

    // Grade the quiz
    let correct = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++
    })

    const total = questions.length
    const passMark = Math.ceil(total * 0.67) // 67% to pass
    const passed = correct >= passMark
    const score = Math.round((correct / total) * 100)

    // XP earned (partial XP even if failed)
    const xpEarned = passed ? xpReward : Math.round(xpReward * 0.2)

    // Badge earned on pass
    const badge = passed ? getBadge(level, skill) : null

    return NextResponse.json({
      result: {
        passed,
        correct,
        total,
        score,
        xpEarned,
        badge,
        message: passed
          ? `🎉 Level ${level} Unlocked! You scored ${score}%`
          : `❌ ${score}% — Need ${Math.round(passMark/total*100)}% to pass. Try again!`,
      }
    }, { status: 200 })

  } catch (err) {
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 })
  }
}

function getBadge(level, skill) {
  const badges = {
    1: '🌱 Seedling',
    2: '⚡ Spark',
    3: '🔥 Ignited',
    4: '💎 Diamond',
    5: '🏆 Champion',
  }
  return badges[level] || '⭐ Achiever'
}
