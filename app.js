const sources = [
  {
    id: "scania",
    name: "Servant Leadership",
    shortName: "Servant Leadership",
  },
  {
    id: "liberating-structures",
    name: "Liberating Structures",
    shortName: "Liberating Structures",
  },
];

const lenses = [
  {
    id: "align",
    name: "Align Direction",
    shortName: "Align direction",
    description:
      "Clarify purpose, outcomes, boundaries, and shared agreements so people can move with more autonomy and less confusion.",
  },
  {
    id: "situational",
    name: "Situational Leadership",
    shortName: "Situational leader",
    description:
      "Adapt the support, coaching, and leadership response to what the person or team actually needs right now.",
  },
  {
    id: "gamechanger",
    name: "Gamechanger Practices",
    shortName: "Gamechanger",
    description:
      "Create movement with experimentation, fresh perspectives, distributed change leadership, and participative exercises.",
  },
  {
    id: "system",
    name: "Whole-System View",
    shortName: "Think and act for the whole",
    description:
      "Look across the wider system to improve flow, reduce friction, and surface what is holding back progress.",
  },
];

const scenarios = [
  {
    title: "Direction is fuzzy",
    description:
      "Clarify purpose and desired outcomes before people drift into different interpretations.",
    lensId: "align",
    sourceId: null,
    recommendedToolIds: ["why-what-how", "intent-briefs", "outcome-framing"],
    searchTerms: "direction alignment purpose outcomes",
  },
  {
    title: "Autonomy feels off",
    description:
      "Calibrate support, expectations, and help requests when people feel blocked or micromanaged.",
    lensId: "situational",
    sourceId: null,
    recommendedToolIds: ["support-autonomy", "delegation-board", "ls-winfy"],
    searchTerms: "autonomy support ownership delegation help",
  },
  {
    title: "The team feels stuck",
    description:
      "Use reflection, peer help, and fresh structure to unlock what the team cannot see on its own.",
    lensId: "situational",
    sourceId: null,
    recommendedToolIds: ["team-maturity-radar", "ls-troika-consulting", "retros-prompts"],
    searchTerms: "stuck team reflection peer help retro",
  },
  {
    title: "Need participation fast",
    description:
      "Get everyone contributing quickly instead of waiting for a few loud voices to lead.",
    lensId: "gamechanger",
    sourceId: "liberating-structures",
    recommendedToolIds: ["ls-1-2-4-all", "ls-15-solutions", "ls-winfy"],
    searchTerms: "participation inclusion fast ideas exercise",
  },
  {
    title: "Need to break habits",
    description:
      "Surface behaviors, routines, or portfolio traps that keep the work stuck where it is.",
    lensId: "system",
    sourceId: null,
    recommendedToolIds: ["ls-triz", "ls-ecocycle-planning", "experiment-canvas"],
    searchTerms: "habits stop doing obstacles portfolio change",
  },
  {
    title: "Change needs momentum",
    description:
      "Build traction through local action, storytelling, and practical exercises that lower the barrier to movement.",
    lensId: "gamechanger",
    sourceId: null,
    recommendedToolIds: ["change-champion-circles", "storytelling", "ls-15-solutions"],
    searchTerms: "change momentum local action adoption",
  },
  {
    title: "Flow is too slow",
    description:
      "Look across handoffs, bottlenecks, and activity portfolios instead of optimizing one slice at a time.",
    lensId: "system",
    sourceId: null,
    recommendedToolIds: ["value-stream-mapping", "ls-ecocycle-planning", "stakeholder-management"],
    searchTerms: "flow bottlenecks handoffs system portfolio",
  },
];

const lsThemes = ["Analyze", "Help", "Plan", "Reveal", "Share", "Strategize"];

const lsStructures = [
  { id: "ls-1-2-4-all", title: "1-2-4-All", themes: ["Reveal"], participation: ["group"], formats: ["in-person", "online"], time: "12 min.", blurb: "Move from solo thinking to shared ideas in fast rounds." },
  { id: "ls-impromptu-networking", title: "Impromptu Networking", themes: ["Share"], participation: ["group"], formats: ["in-person", "online"], time: "15-20 min.", blurb: "Open a session by quickly exchanging expectations and current challenges." },
  { id: "ls-nine-whys", title: "Nine Whys", themes: ["Analyze"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "20 min.", blurb: "Work backward from the task to the deeper purpose that makes it matter." },
  { id: "ls-triz", title: "Creative Destruction (TRIZ)", themes: ["Reveal"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "35 min.", blurb: "Expose the habits that would wreck the result, then stop the ones already present." },
  { id: "ls-w3", title: "What, So What, Now What? (W3)", themes: ["Analyze"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "45 min.", blurb: "Pause to interpret what happened and decide the next adjustment." },
  { id: "ls-appreciative-interviews", title: "Appreciative Interviews", themes: ["Reveal", "Share"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "55 min.", blurb: "Find the conditions behind success and build from them." },
  { id: "ls-troika-consulting", title: "Troika Consulting", themes: ["Help", "Reveal"], participation: ["group"], formats: ["in-person", "online"], time: "30 min.", blurb: "Give one person rapid peer coaching while they listen." },
  { id: "ls-15-solutions", title: "15% Solutions", themes: ["Reveal"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "10-20 min.", blurb: "Spot the next move you can make without waiting for more authority." },
  { id: "ls-25-10-crowd-sourcing", title: "25/10 Crowd Sourcing", themes: ["Reveal"], participation: ["group"], formats: ["in-person", "online"], time: "30 min.", blurb: "Generate many bold ideas and let the group surface the strongest ones." },
  { id: "ls-ecocycle-planning", title: "Ecocycle Planning", themes: ["Analyze", "Strategize"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "95 min.", blurb: "Map activities across the lifecycle to spot traps and release movement." },
  { id: "ls-conversation-cafe", title: "Conversation Cafe", themes: ["Share"], participation: ["group"], formats: ["in-person", "online"], time: "35-60 min.", blurb: "Use turn-taking dialogue to explore a difficult question together." },
  { id: "ls-wicked-questions", title: "Wicked Questions", themes: ["Reveal"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "25 min.", blurb: "Name the tensions that must be held at the same time." },
  { id: "ls-min-specs", title: "Min Specs", themes: ["Strategize"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "35-50 min.", blurb: "Define the few rules that protect purpose without overcontrolling." },
  { id: "ls-user-experience-fishbowl", title: "User Experience Fishbowl", themes: ["Share"], participation: ["group"], formats: ["in-person", "online"], time: "35-75 min.", blurb: "Let practitioners share live experience with a wider audience." },
  { id: "ls-hsr", title: "Heard, Seen, Respected (HSR)", themes: ["Help"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "35 min.", blurb: "Practice listening so people feel understood before responding." },
  { id: "ls-p2p", title: "Purpose-to-Practice (P2P)", themes: ["Plan"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "120 min.", blurb: "Design a durable initiative across purpose, principles, people, practices, and partners." },
  { id: "ls-drawing-together", title: "Drawing Together", themes: ["Reveal"], participation: ["group"], formats: ["in-person", "online"], time: "40 min.", blurb: "Use images instead of only words to surface insight and direction." },
  { id: "ls-options-place", title: "Options Place", themes: ["Reveal"], participation: ["group"], formats: ["in-person", "online"], time: "90 min - 3 days", blurb: "Create a physical marketplace where ideas and initiative can self-organize." },
  { id: "ls-dad", title: "Discovery & Action Dialogue (DAD)", themes: ["Reveal"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "25-70 min.", blurb: "Unlock local responses to chronic problems through peer discovery." },
  { id: "ls-shift-and-share", title: "Shift and Share", themes: ["Share"], participation: ["group"], formats: ["in-person", "online"], time: "30-90 min.", blurb: "Spread promising practices quickly through short peer exchanges." },
  { id: "ls-improv-prototyping", title: "Improv Prototyping", themes: ["Reveal"], participation: ["group"], formats: ["in-person", "online"], time: "25-65 min.", blurb: "Act out solutions to test possibilities before committing." },
  { id: "ls-helping-heuristics", title: "Helping Heuristics", themes: ["Help"], participation: ["group"], formats: ["in-person", "online"], time: "15-45 min.", blurb: "Experiment with different ways of asking for, giving, and receiving help." },
  { id: "ls-panarchy", title: "Panarchy", themes: ["Analyze", "Strategize"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "145 min.", blurb: "See how nested systems evolve, renew, and influence one another." },
  { id: "ls-critical-uncertainties", title: "Critical Uncertainties", themes: ["Strategize"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "100 min.", blurb: "Build strategy by exploring different plausible futures." },
  { id: "ls-simple-ethnography", title: "Simple Ethnography", themes: ["Analyze"], participation: ["group"], formats: ["in-person", "online"], time: "75-400 min.", blurb: "Go observe real behavior in the field instead of assuming." },
  { id: "ls-celebrity-interview", title: "Celebrity Interview", themes: ["Share"], participation: ["group"], formats: ["in-person", "online"], time: "30-55 min.", blurb: "Bring leaders or experts into closer contact with frontline reality." },
  { id: "ls-design-storyboards", title: "Design Storyboards", themes: ["Plan"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "25-70 min.", blurb: "Plan a meeting or change journey step by step." },
  { id: "ls-social-network-webbing", title: "Social Network Webbing", themes: ["Help", "Share"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "60 min.", blurb: "Map relationships and strengthen the links that matter." },
  { id: "ls-wise-crowds", title: "Wise Crowds", themes: ["Help", "Reveal"], participation: ["group"], formats: ["in-person", "online"], time: "60 min.", blurb: "Use rotating peer input to deepen thinking on a real challenge." },
  { id: "ls-winfy", title: "What I Need From You (WINFY)", themes: ["Help"], participation: ["group"], formats: ["in-person", "online"], time: "55-70 min.", blurb: "Turn vague dependencies into explicit requests and responses." },
  { id: "ls-agreement-certainty-matrix", title: "Agreement & Certainty Matrix", themes: ["Analyze"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "45 min.", blurb: "Sort challenges by level of agreement and certainty." },
  { id: "ls-generative-relationships-star", title: "Generative Relationships STAR", themes: ["Analyze"], participation: ["group"], formats: ["in-person", "online"], time: "30 min.", blurb: "Surface patterns in relationships that create value or friction." },
  { id: "ls-integrated-autonomy", title: "Integrated~Autonomy", themes: ["Strategize"], participation: ["group"], formats: ["in-person", "online"], time: "80 min.", blurb: "Design both-and solutions instead of picking one side." },
  { id: "ls-mad-tea", title: "Mad Tea", themes: ["Reveal", "Share"], participation: ["group"], formats: ["in-person", "online"], time: "20-30 min.", blurb: "Use playful prompt rotations to widen reflection and action.", inDevelopment: true },
  { id: "ls-spiral-journal", title: "Spiral Journal", themes: ["Reveal"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "10-25 min.", blurb: "Capture recurring reflections over time to reveal patterns.", inDevelopment: true },
  { id: "ls-folding-spectrogram", title: "Folding Spectrogram", themes: ["Reveal"], participation: ["group"], formats: ["in-person", "online"], time: "20 min.", blurb: "Make diverse positions visible and discuss them with more nuance.", inDevelopment: true },
  { id: "ls-positive-gossip", title: "Positive Gossip", themes: ["Help", "Share"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "15 min.", blurb: "Replace negative gossip with deliberate appreciation and noticing.", inDevelopment: true },
  { id: "ls-gallery-walk", title: "Gallery Walk", themes: ["Reveal", "Share"], participation: ["group"], formats: ["in-person", "online"], time: "30 min.", blurb: "Review ideas by moving through them physically and discussing what stands out.", inDevelopment: true },
  { id: "ls-network-patterning-cards", title: "Network Patterning Cards", themes: ["Reveal"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "25 min.", blurb: "Use visible pattern cards to notice and reshape work dynamics.", inDevelopment: true },
  { id: "ls-future-present", title: "Future~Present", themes: ["Reveal", "Share"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "25-45 min.", blurb: "Imagine scaled-up action by moving between current and future states.", inDevelopment: true },
  { id: "ls-talking-with-pixies", title: "Talking with Pixies", themes: ["Help", "Reveal"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "25 min.", blurb: "Surface hidden assumptions that may be limiting progress.", inDevelopment: true },
  { id: "ls-tiny-demons", title: "Tiny Demons", themes: ["Reveal"], participation: ["group", "solo"], formats: ["in-person", "online"], time: "15 min.", blurb: "Acknowledge recurring internal blockers so they lose some power.", inDevelopment: true },
  { id: "ls-strategy-knotworking", title: "Strategy Knotworking", themes: ["Strategize"], participation: ["group"], formats: ["in-person"], time: "1 day", blurb: "Develop strategy in motion by noticing how intent and action intertwine.", inDevelopment: true },
  { id: "ls-grief-walking", title: "Grief Walking", themes: ["Help"], participation: ["group"], formats: ["in-person", "online"], time: "30 min.", blurb: "Use supported conversation while moving through loss or deep change.", inDevelopment: true },
];

const tools = [
  {
    id: "why-what-how",
    title: "Why, What, How Canvas",
    sourceId: "scania",
    lensId: "align",
    time: "60-120 min",
    summary:
      "Create shared direction without over-specifying the solution path.",
    signal:
      "Best when people jump into solutions before they agree on purpose and desired outcome.",
    unlocks: [
      "Shared understanding of purpose",
      "Outcome alignment instead of task fixation",
      "Ownership in the open-ended how",
    ],
    useWhen: [
      "Teams move too quickly into solutions",
      "Goals feel open to multiple interpretations",
      "Complex work needs exploration, not instruction",
    ],
    steps: [
      "Start with why: what matters and why now.",
      "Define what success looks like without prescribing the answer.",
      "Open the how as a space for options and experiments.",
      "Align on the next move while keeping execution flexible.",
    ],
    facilitation: [
      "Keep the room in why and what before discussing how.",
      "Challenge solution-jumping behavior.",
      "Use a visible three-part canvas or board.",
    ],
    goodFor: ["kickoff", "alignment", "strategy", "autonomy"],
    questions: [
      "What problem are we solving?",
      "What does success look like?",
      "How might we get there without over-specifying the path?",
    ],
    quote: "How do we stay aligned without telling people what to do?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7B2EA907EB-ED30-4662-B9C4-A772866A925D%7D&file=Why,%20What,%20How%20Canvas%20%20-%20(I%20Align%20direction%20via%20WHY%20%26%20WHAT).docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "intent-briefs",
    title: "Intent Briefs",
    sourceId: "scania",
    lensId: "align",
    time: "45-90 min",
    summary:
      "Replace detailed instructions with a short, clear statement of intent, constraints, and ownership.",
    signal:
      "Best when teams are capable but still dependent on detailed direction or approvals.",
    unlocks: [
      "Autonomy with alignment",
      "Faster decisions",
      "Clearer ownership inside boundaries",
    ],
    useWhen: [
      "Work is complex and cannot be fully predefined",
      "Several teams need aligned action",
      "You want people to act without waiting for permission",
    ],
    steps: [
      "Write the purpose and desired outcome first.",
      "State the non-negotiable constraints and principles.",
      "Clarify who owns decisions and what signals progress.",
      "Keep the brief short enough to guide action immediately.",
    ],
    facilitation: [
      "Stop the room when it drifts into task lists.",
      "Sharpen vague language until the intent is unmistakable.",
      "Test whether a team could act from the brief unaided.",
    ],
    goodFor: ["cross-team", "clarity", "ownership", "decision making"],
    questions: [
      "Why does this matter?",
      "What does success look like?",
      "What constraints must we respect?",
    ],
    quote:
      "Lead with intent so people can act, not with task lists so people can comply.",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7B92D29569-EC93-4F5F-9175-A96C0B3D1437%7D&file=Intent%20Briefs%20%E2%80%93%20(I%20align%20direction%20via%20WHY%20%26%20WHAT).docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "delegation-board",
    title: "Delegation Board",
    sourceId: "scania",
    lensId: "align",
    time: "60-120 min",
    summary:
      "Make ownership and decision-making visible instead of assumed.",
    signal:
      "Best when people either wait too long for decisions or act in ways that surprise each other.",
    unlocks: [
      "A shared language for delegation",
      "Faster decisions with less friction",
      "Transparent ownership and authority",
    ],
    useWhen: [
      "Decision-making feels slow or unclear",
      "Teams are over-dependent on leaders",
      "Leadership wants more autonomy without losing alignment",
    ],
    steps: [
      "List the key decision areas in the work.",
      "Discuss the right autonomy level for each one.",
      "Make the board visible in the team's everyday environment.",
      "Revisit it as trust, skill, and context evolve.",
    ],
    facilitation: [
      "Treat tensions as useful data.",
      "Keep the conversation focused on clarity and learning.",
      "Use the board as a living artifact, not a one-off workshop output.",
    ],
    goodFor: ["ownership", "delegation", "trust", "expectations"],
    questions: [
      "Where do we actually need alignment?",
      "Where can ownership move closer to the work?",
      "What are we still controlling out of habit?",
    ],
    quote:
      "If everyone here is a leader, where do we truly need alignment versus autonomy?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7BC010BFF7-7CFE-4674-9384-316E54E6150A%7D&file=Delegation%20Board%20-%20(I%20align%20direction%20via%20WHY%20%26%20WHAT).docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "outcome-framing",
    title: "Outcome Framing",
    sourceId: "scania",
    lensId: "align",
    time: "45-90 min",
    summary:
      "Shift the conversation from activity and output to the impact the work should create.",
    signal:
      "Best when teams are busy but the value of the work is still blurry.",
    unlocks: [
      "Clarity on value instead of task completion",
      "Better prioritization based on impact",
      "Freedom to change the path while keeping the goal steady",
    ],
    useWhen: [
      "Work is described as tasks rather than value",
      "Success means different things to different people",
      "The team needs autonomy without losing focus",
    ],
    steps: [
      "Describe the current state and who is affected.",
      "Name the desired outcome and why it matters.",
      "Define signals that show progress or success.",
      "Leave the how open so the team can choose the path.",
    ],
    facilitation: [
      "Redirect solution talk back to outcomes.",
      "Accept qualitative and quantitative signals.",
      "Keep ownership tied to the outcome, not just deliverables.",
    ],
    goodFor: ["okr", "prioritization", "impact", "focus"],
    questions: [
      "Who benefits if we succeed?",
      "What is different when the outcome is achieved?",
      "How will we know we are moving in the right direction?",
    ],
    quote: "What difference are we actually trying to make?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7B9CFEBD57-5A1E-46D9-8EBE-85744DF78688%7D&file=Outcome%20Framing%20-%20(I%20align%20direction%20via%20WHY%20%26%20WHAT)%20.docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "support-autonomy",
    title: "Support vs Autonomy Check-ins",
    sourceId: "scania",
    lensId: "situational",
    time: "15-45 min",
    summary:
      "Continuously calibrate whether people need more guidance, more coaching, or more space.",
    signal:
      "Best when someone feels micromanaged, under-supported, or hard to read in the middle of change.",
    unlocks: [
      "Right-sized leadership support",
      "More autonomy without abandonment",
      "Visible needs and faster adjustment",
    ],
    useWhen: [
      "Needs are changing quickly",
      "You want a healthier coaching rhythm",
      "The team is growing in confidence and autonomy",
    ],
    steps: [
      "Introduce a simple support-to-autonomy scale.",
      "Ask each person where they are today.",
      "Explore what they need more or less of.",
      "Adjust behavior and revisit regularly.",
    ],
    facilitation: [
      "Normalize that needs vary over time.",
      "Listen for the underlying need beneath the request.",
      "Use the check-in as calibration, not evaluation.",
    ],
    goodFor: ["coaching", "1:1", "trust", "feedback"],
    questions: [
      "Where are you on the scale right now?",
      "What do you need more of?",
      "What do you need less of?",
    ],
    quote: "What do you need from me, or from us, right now to succeed?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7B9671FA3F-BAF2-4497-A3C6-44C76EF382FC%7D&file=%E2%80%9CSupport%20vs%20Autonomy%E2%80%9D%20Check-ins%20(I%20am%20a%20situational%20Leader).docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "team-maturity-radar",
    title: "Team Maturity Radar",
    sourceId: "scania",
    lensId: "situational",
    time: "60-120 min",
    summary:
      "Make team health visible so people can discuss maturity, gaps, and growth areas with shared language.",
    signal:
      "Best when a team feels stuck, healthy on the surface, or unsure what to improve next.",
    unlocks: [
      "Honest conversations about team effectiveness",
      "Shared ownership of development",
      "Concrete focus areas for improvement",
    ],
    useWhen: [
      "You need a broader reflection than delivery metrics",
      "Psychological safety and collaboration need attention",
      "You want to track growth over time",
    ],
    steps: [
      "Choose the maturity dimensions that matter.",
      "Let people score independently.",
      "Visualize the results in a shared radar or table.",
      "Discuss differences and pick one or two focus areas.",
    ],
    facilitation: [
      "Create safety before asking for scores.",
      "Treat the discussion as the real value, not the numbers.",
      "Turn reflection into small experiments or commitments.",
    ],
    goodFor: ["team health", "reflection", "growth", "retrospective"],
    questions: [
      "Where do we see the biggest gaps?",
      "What surprises us?",
      "Where do we want to grow next?",
    ],
    quote:
      "The real value comes not from the shape of the radar, but from the conversation it creates.",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7BE53ED31F-29F3-4768-9F76-48DCE95D7089%7D&file=Team%20maturity%20radar%20(I%20am%20a%20situational%20leader)%20.docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "situational-matrix",
    title: "Situational Leadership Matrix",
    sourceId: "scania",
    lensId: "situational",
    time: "45-90 min",
    summary:
      "Adapt leadership response to the competence and commitment needed in a specific situation.",
    signal:
      "Best when one person needs something different from another, or when support feels mismatched.",
    unlocks: [
      "Leadership that matches the situation",
      "More effective development support",
      "A path from close support to higher autonomy",
    ],
    useWhen: [
      "Different people are at different development levels",
      "Someone is overwhelmed, stuck, or under-supported",
      "You want to grow autonomy without stepping away too early",
    ],
    steps: [
      "Pick a specific task or situation to assess.",
      "Assess competence and commitment for that context.",
      "Map the situation to a development level.",
      "Choose a matching leadership response and revisit over time.",
    ],
    facilitation: [
      "Keep the focus on the situation, not on labeling people.",
      "Discuss current support versus needed support.",
      "Translate insight into clear behavioral changes.",
    ],
    goodFor: ["coaching", "mentoring", "onboarding", "adaptive leadership"],
    questions: [
      "What support is currently given?",
      "What support is actually needed?",
      "What should we start or stop doing?",
    ],
    quote:
      "What kind of leadership does this situation need from me, or us, right now?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7B762A4296-453C-4FC4-95CF-0341A927340F%7D&file=Situational%20Leadership%20Matrix%20(I%20am%20a%20situational%20Leader).docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "change-champion-circles",
    title: "Change Champion Circles",
    sourceId: "scania",
    lensId: "gamechanger",
    time: "60-90 min setup",
    summary:
      "Build a distributed network that helps change move through relationships, local action, and feedback loops.",
    signal:
      "Best when transformation depends on more than a small core team and needs broader ownership.",
    unlocks: [
      "Peer-driven change adoption",
      "Faster feedback from the real work",
      "A wider network of engaged informal leaders",
    ],
    useWhen: [
      "A change initiative needs more traction",
      "There is a gap between strategy and day-to-day reality",
      "You want people closest to the work to shape the change",
    ],
    steps: [
      "Identify a diverse mix of formal and informal leaders.",
      "Form small circles with a clear purpose.",
      "Use recurring sessions to gather signals and actions.",
      "Support the network with visibility and coaching.",
    ],
    facilitation: [
      "Treat circles as connection points, not reporting lines.",
      "Keep direction clear but contribution open.",
      "Highlight patterns that move across teams.",
    ],
    goodFor: ["transformation", "engagement", "culture", "change adoption"],
    questions: [
      "What signals of progress or resistance are we seeing?",
      "What opportunities are emerging locally?",
      "What experiment can we run next?",
    ],
    quote: "How do we enable people to lead change where they are?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7BC9B049FB-1CB6-4495-AEE9-E1B00173351F%7D&file=Change%20Champion%20Circles%20(I%20am%20a%20game%20changer).docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "experiment-canvas",
    title: "Experiment Canvas",
    sourceId: "scania",
    lensId: "gamechanger",
    time: "45-75 min",
    summary:
      "Turn debate into learning by framing small, testable experiments around a clear hypothesis.",
    signal:
      "Best when there are several possible paths, too much analysis, or a need to learn before scaling.",
    unlocks: [
      "Faster learning loops",
      "Lower-risk change through small experiments",
      "Evidence-based decisions instead of opinions",
    ],
    useWhen: [
      "There is uncertainty or several plausible solutions",
      "The team is stuck in discussion",
      "You want to build a stronger learning culture",
    ],
    steps: [
      "State the hypothesis and intended outcome.",
      "Design the smallest experiment that could teach something useful.",
      "Define signals of success or failure and a timeframe.",
      "Review, then scale, adapt, or stop.",
    ],
    facilitation: [
      "Push big ideas into smaller tests.",
      "Celebrate learning, not only success.",
      "Keep the experiment visible so the team returns to it.",
    ],
    goodFor: ["learning", "innovation", "uncertainty", "change"],
    questions: [
      "What are we assuming?",
      "What is the smallest thing we can test?",
      "What will we learn if this does not work?",
    ],
    quote: "What is the smallest thing we can try to learn something valuable?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7BC51FA631-4932-4244-92B5-6C939BCCD09D%7D&file=Experiment%20canvas%20(I%20am%20a%20gamachanger)%20.docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "stakeholder-management",
    title: "Stakeholder Management",
    sourceId: "scania",
    lensId: "gamechanger",
    time: "45-90 min",
    summary:
      "Shift stakeholder work from expectation management to relationship building and mutual value creation.",
    signal:
      "Best when different groups influence the work, expectations clash, or buy-in matters.",
    unlocks: [
      "Better alignment across boundaries",
      "Less friction and fewer misunderstandings",
      "Stronger trust and better decisions through perspective-taking",
    ],
    useWhen: [
      "An initiative crosses several teams or interests",
      "Dependencies are slowing progress",
      "Communication has become reactive instead of intentional",
    ],
    steps: [
      "Identify the stakeholders around the work.",
      "Map power, interest, goals, and concerns.",
      "Choose a fit-for-purpose engagement approach for each group.",
      "Keep the map alive as relationships evolve.",
    ],
    facilitation: [
      "Frame the activity as understanding, not labeling.",
      "Challenge assumptions about what others care about.",
      "Translate the map into real conversations and owners.",
    ],
    goodFor: ["buy-in", "alignment", "communication", "relationships"],
    questions: [
      "Who is affected by this work?",
      "What do they care about?",
      "How do we create mutual value in the relationship?",
    ],
    quote:
      "How do we engage each stakeholder in a way that creates mutual value?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7BD8EDF26F-6D2E-4B2A-A0E9-EAFD841B091D%7D&file=Stakeholder%20Management%20(I%20am%20a%20game%20changer).docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "retros-prompts",
    title: "Break-the-Routine Retros",
    sourceId: "scania",
    lensId: "gamechanger",
    time: "45-75 min",
    summary:
      "Use creative prompts to break repetitive retrospective patterns and reveal new insights.",
    signal:
      "Best when retros feel flat, predictable, or trapped in the same conversations.",
    unlocks: [
      "Fresh perspectives on recurring problems",
      "More energy and participation",
      "Creative insight that still leads to action",
    ],
    useWhen: [
      "The same issues keep coming back",
      "Participation is low or too predictable",
      "The team needs a new angle on old patterns",
    ],
    steps: [
      "Choose a prompt that reframes the conversation.",
      "Give people time to reflect individually or in groups.",
      "Share the stories and patterns that emerge.",
      "Turn the insight into one or two actions or experiments.",
    ],
    facilitation: [
      "Keep the tone playful, but the purpose sharp.",
      "Let people interpret the prompt instead of over-explaining it.",
      "Connect the metaphor back to real behavior and next steps.",
    ],
    goodFor: ["retrospective", "energy", "creativity", "reflection"],
    questions: [
      "What surprised us?",
      "What does this metaphor reveal?",
      "What should we do differently now?",
    ],
    quote: "What new perspective can help us see what we have been missing?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7B8E685D0A-4E9E-491C-BC05-658D05860A3C%7D&file=Retros%20with%20%E2%80%9CBreak-the-Routine%E2%80%9D%20Prompts%20(I%20am%20a%20gamechanger).docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "storytelling",
    title: "Storytelling",
    sourceId: "scania",
    lensId: "gamechanger",
    time: "30-60 min",
    summary:
      "Turn information into meaning by connecting work to purpose, tension, action, outcome, and learning.",
    signal:
      "Best when the facts are available but the message still is not landing or moving people.",
    unlocks: [
      "Stronger engagement and buy-in",
      "Shared narratives that carry culture",
      "A more human connection to purpose and change",
    ],
    useWhen: [
      "You need to inspire or align people",
      "A change story needs more emotional connection",
      "You want to make learning memorable",
    ],
    steps: [
      "Set the context and the challenge.",
      "Describe the action taken and what changed.",
      "Name the outcome and the deeper meaning.",
      "Use the story to connect people to something larger than the task.",
    ],
    facilitation: [
      "Reward authenticity over polished performance.",
      "Listen for meaning, not just facts.",
      "Use stories to reveal cultural patterns and possibilities.",
    ],
    goodFor: ["communication", "change", "culture", "inspiration"],
    questions: [
      "What happened?",
      "Why did it matter?",
      "What does this story make possible now?",
    ],
    quote: "What story are we telling, and what does it make possible?",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7B24881AA1-7A0A-4660-98F6-6CFC55001630%7D&file=Storytelling%20%E2%80%93%20(I%20am%20a%20gamechanger)%20.docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "value-stream-mapping",
    title: "Value Stream Mapping",
    sourceId: "scania",
    lensId: "system",
    time: "90-150 min",
    summary:
      "Make the end-to-end flow of value visible so delays, handoffs, and systemic waste can be improved together.",
    signal:
      "Best when delivery is slow, unpredictable, or full of hidden waiting time between teams.",
    unlocks: [
      "Visibility into the actual flow of work",
      "Bottleneck and handoff insight",
      "A stronger shared view of the wider system",
    ],
    useWhen: [
      "Delivery is slower than expected",
      "Several teams share a flow but optimize locally",
      "Bottlenecks and delays are hard to see clearly",
    ],
    steps: [
      "Define the value stream and the start and end points.",
      "Map each step, including wait time as well as work time.",
      "Highlight delays, queues, rework, and handoffs.",
      "Design a better future state and pick a few improvements to test.",
    ],
    facilitation: [
      "Keep the focus on the system, not on blame.",
      "Invite people from across the full flow.",
      "Show that waiting time is often the biggest opportunity.",
    ],
    goodFor: ["flow", "delivery", "systems thinking", "cross-team"],
    questions: [
      "Where do we wait the most?",
      "Where does work get stuck?",
      "How can value flow faster and smoother for the customer?",
    ],
    quote: "Most time is often spent waiting, not working.",
    sourceLabel: "Open Scania source",
    sourceUrl:
      "https://scaniaazureservices.sharepoint.com/teams/AgileScania/_layouts/15/Doc.aspx?sourcedoc=%7BA5962B4B-F70D-421C-AF18-F9990B277B94%7D&file=Value%20Stream%20Mapping%20(I%20Think%20and%20Act%20for%20the%20whole).docx&action=default&mobileredirect=true?web=1",
  },
  {
    id: "one-two-four-all",
    title: "1-2-4-All",
    sourceId: "liberating-structures",
    lensId: "gamechanger",
    time: "12 min",
    summary:
      "Engage everyone simultaneously in generating questions, ideas, and suggestions.",
    signal:
      "Best when you need broad participation fast instead of hearing only the first or loudest voices.",
    unlocks: [
      "Immediate participation from everyone",
      "More ideas before group convergence",
      "A low-friction way to start collective thinking",
    ],
    useWhen: [
      "A meeting needs fast inclusion",
      "The group is large or unevenly vocal",
      "You want ideas before open discussion",
    ],
    steps: [
      "Ask people to reflect alone for one minute.",
      "Pair up and share for two minutes.",
      "Join foursomes and build for four minutes.",
      "Harvest patterns or strongest ideas in the full group.",
    ],
    facilitation: [
      "Keep the timing crisp.",
      "Use one clear prompt only.",
      "Harvest themes, not every single comment.",
    ],
    goodFor: ["participation", "ideation", "meetings", "inclusion"],
    questions: [
      "What are your first ideas?",
      "What gets stronger when we combine them?",
      "What deserves full-group attention now?",
    ],
    quote:
      "Move from solo reflection to shared intelligence before the full group converges.",
    sourceLabel: "Open Liberating Structures exercise",
    sourceUrl:
      "https://liberatingstructures.info/liberating-structure/1-2-4-all/",
  },
  {
    id: "triz",
    title: "Creative Destruction (TRIZ)",
    sourceId: "liberating-structures",
    lensId: "system",
    time: "35 min",
    summary:
      "Stop counterproductive activities and behaviors to make space for innovation.",
    signal:
      "Best when a team is repeating habits that quietly undermine the result it says it wants.",
    unlocks: [
      "Permission to name destructive patterns",
      "Clarity on what to stop or reduce",
      "A practical route from insight to behavioral change",
    ],
    useWhen: [
      "The same bad patterns keep returning",
      "The team needs to name what is getting in its own way",
      "Innovation is blocked by routine behavior",
    ],
    steps: [
      "Imagine how to guarantee the worst possible outcome.",
      "List the actions and behaviors that would create it.",
      "Notice which of those patterns already exist today.",
      "Decide what to stop, reduce, or interrupt immediately.",
    ],
    facilitation: [
      "Lean into candor without blame.",
      "Keep the shift from exaggeration to present reality explicit.",
      "Translate insight into a few concrete stop-doing moves.",
    ],
    goodFor: ["habits", "improvement", "innovation", "candor"],
    questions: [
      "How would we guarantee failure?",
      "Which of those behaviors already show up here?",
      "What do we stop doing now?",
    ],
    quote:
      "First make the self-sabotaging patterns visible, then remove their grip on the work.",
    sourceLabel: "Open Liberating Structures exercise",
    sourceUrl:
      "https://liberatingstructures.info/liberating-structure/creative-destruction-triz/",
  },
  {
    id: "troika-consulting",
    title: "Troika Consulting",
    sourceId: "liberating-structures",
    lensId: "situational",
    time: "30 min",
    summary:
      "Get immediate practical and imaginative help from colleagues.",
    signal:
      "Best when someone needs fresh peer help quickly without turning it into a long group problem-solving session.",
    unlocks: [
      "Fast peer coaching",
      "Practical help without over-facilitation",
      "New angles from colleagues who are not stuck in the problem",
    ],
    useWhen: [
      "Someone is stuck on a live challenge",
      "A team wants structured peer coaching",
      "You need practical help in a short timebox",
    ],
    steps: [
      "One person shares a challenge briefly.",
      "The other two discuss ideas while the presenter listens.",
      "The presenter reflects on what was useful.",
      "Rotate so everyone gets a turn.",
    ],
    facilitation: [
      "Keep the challenge framing concise.",
      "Do not let the presenter defend or explain during peer discussion.",
      "Rotate quickly to maintain energy.",
    ],
    goodFor: ["peer coaching", "problem solving", "support", "reflection"],
    questions: [
      "What challenge do you need help with?",
      "What options become visible when you listen rather than explain?",
      "What will you try next?",
    ],
    quote:
      "Structured peer help can move faster and go deeper than open advice-giving.",
    sourceLabel: "Open Liberating Structures exercise",
    sourceUrl:
      "https://liberatingstructures.info/liberating-structure/troika-consulting/",
  },
  {
    id: "fifteen-percent-solutions",
    title: "15% Solutions",
    sourceId: "liberating-structures",
    lensId: "gamechanger",
    time: "10-20 min",
    summary:
      "Discover and focus on what each person can do now with the resources and authority they already have.",
    signal:
      "Best when people feel blocked by scale, dependency, or waiting for permission.",
    unlocks: [
      "Immediate local action",
      "Momentum without over-planning",
      "A practical antidote to helplessness",
    ],
    useWhen: [
      "A group is overwhelmed by a large problem",
      "People are waiting for someone else to act",
      "You want action before the next meeting",
    ],
    steps: [
      "Ask each person what 15% they can do now.",
      "Make sure it requires no extra authority or resources.",
      "Share the actions with others for sharpening or support.",
      "Leave with one concrete move each person will make.",
    ],
    facilitation: [
      "Keep actions small and real.",
      "Do not let the conversation drift into dependency talk.",
      "Use peer sharpening to make actions more concrete.",
    ],
    goodFor: ["momentum", "action", "ownership", "change"],
    questions: [
      "What can you do now?",
      "What is within your existing authority?",
      "What first move will create momentum?",
    ],
    quote:
      "Small moves inside existing authority often unlock more than big plans that depend on others.",
    sourceLabel: "Open Liberating Structures exercise",
    sourceUrl:
      "https://liberatingstructures.info/liberating-structure/15-solutions/",
  },
  {
    id: "ecocycle-planning",
    title: "Ecocycle Planning",
    sourceId: "liberating-structures",
    lensId: "system",
    time: "95 min",
    summary:
      "Analyze the full portfolio of activities and relationships to identify obstacles and opportunities for progress.",
    signal:
      "Best when the issue is not one project but a whole mix of activities that are maturing, stuck, or overloaded.",
    unlocks: [
      "Portfolio-level visibility",
      "A way to spot bottlenecks and traps",
      "Better decisions about where to nurture, stop, or free up work",
    ],
    useWhen: [
      "Too much work is active at once",
      "The group needs a portfolio view rather than a single-project view",
      "Progress is blocked by hidden structural traps",
    ],
    steps: [
      "Map activities across the ecocycle stages.",
      "Look for work trapped in rigidity or poverty zones.",
      "Discuss what to nurture, free, or stop.",
      "Choose actions that rebalance the portfolio.",
    ],
    facilitation: [
      "Keep the discussion at portfolio level, not project detail only.",
      "Look for trapped work and missing renewal.",
      "Use the map to prompt decisions, not just diagnosis.",
    ],
    goodFor: ["portfolio", "systems thinking", "flow", "prioritization"],
    questions: [
      "Where is work getting trapped?",
      "What needs nurture, destruction, or renewal?",
      "What would rebalance the system now?",
    ],
    quote:
      "A portfolio map can reveal why energy is stuck even when individual initiatives look sensible on their own.",
    sourceLabel: "Open Liberating Structures exercise",
    sourceUrl:
      "https://liberatingstructures.info/liberating-structure/ecocycle-planning/",
  },
  {
    id: "winfy",
    title: "What I Need From You (WINFY)",
    sourceId: "liberating-structures",
    lensId: "align",
    time: "55-70 min",
    summary:
      "Surface essential needs across functions and accept or reject requests for support.",
    signal:
      "Best when teams have cross-functional dependencies but requests and commitments remain fuzzy.",
    unlocks: [
      "Clearer cross-functional expectations",
      "Explicit yes, no, or counteroffer responses",
      "Healthier dependency conversations",
    ],
    useWhen: [
      "Several functions depend on each other",
      "The work is slowed by vague requests",
      "You want clearer support agreements across boundaries",
    ],
    steps: [
      "Ask each role or group what it needs from others.",
      "Make the requests concrete and direct.",
      "Let the receiving party accept, reject, or counteroffer.",
      "Capture the resulting commitments visibly.",
    ],
    facilitation: [
      "Push for specificity in every request.",
      "Normalize rejection or counteroffers when needed.",
      "Focus on workable agreements, not abstract harmony.",
    ],
    goodFor: ["dependencies", "alignment", "cross-functional work", "commitments"],
    questions: [
      "What do you need from the other group?",
      "Can that request be accepted as stated?",
      "What would make the agreement workable?",
    ],
    quote:
      "Requests become useful only when support expectations are explicit enough to accept, reject, or reshape.",
    sourceLabel: "Open Liberating Structures exercise",
    sourceUrl:
      "https://liberatingstructures.info/liberating-structure/what-i-need-from-you/",
  },
];

const state = {
  activeLensId: null,
  activeSourceId: null,
  searchTerm: "",
  scenarioToolIds: [],
};

const scenarioGrid = document.querySelector("#scenarioGrid");
const lensFilters = document.querySelector("#lensFilters");
const sourceFilters = document.querySelector("#sourceFilters");
const lensCards = document.querySelector("#lensCards");
const toolGrid = document.querySelector("#toolGrid");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const clearFilters = document.querySelector("#clearFilters");
const detailDrawer = document.querySelector("#detailDrawer");
const detailBackdrop = document.querySelector("#detailBackdrop");
const detailContent = document.querySelector("#detailContent");
const closeDrawer = document.querySelector("#closeDrawer");
const openRecommended = document.querySelector("#openRecommended");
const cardTemplate = document.querySelector("#toolCardTemplate");
let lsExerciseDetails = window.lsExerciseDetails ?? {};
let lsExerciseDetailsPromise = null;
const LS_DETAILS_URL = "./ls-details.js?v=2026-04-17-3";

function lensName(lensId) {
  return lenses.find((lens) => lens.id === lensId)?.shortName ?? "";
}

function sourceName(sourceId) {
  return sources.find((source) => source.id === sourceId)?.shortName ?? "";
}

function formatParticipation(structure) {
  return structure.participation.includes("solo") ? "Group & Solo" : "Group";
}

function formatDelivery(structure) {
  return structure.formats.includes("online") && structure.formats.includes("in-person")
    ? "In person & Online"
    : structure.formats.includes("online")
      ? "Online"
      : "In person";
}

function mapLsLens(structure) {
  if (structure.themes.includes("Plan")) {
    return "align";
  }

  if (structure.themes.includes("Help")) {
    return "situational";
  }

  if (structure.themes.includes("Analyze") || structure.themes.includes("Strategize")) {
    return "system";
  }

  return "gamechanger";
}

function getCatalogItems() {
  const servantLeadershipItems = tools
    .filter((tool) => tool.sourceId !== "liberating-structures")
    .map((tool) => ({ ...tool, kind: "tool" }));

  const liberatingStructuresItems = lsStructures.map((structure) => {
    const detailedTool = findDetailedLsTool(structure.id);

    return {
      id: structure.id,
      kind: "ls",
      title: structure.title,
      sourceId: "liberating-structures",
      lensId: mapLsLens(structure),
      time: structure.time,
      summary: detailedTool?.summary ?? structure.blurb,
      signal: structure.inDevelopment
        ? "This structure is marked as in development in the Liberating Structures catalog."
        : detailedTool?.signal ??
          `Best when you need a ${structure.themes.join("/").toLowerCase()} structure in a ${formatParticipation(structure).toLowerCase()} format.`,
      goodFor: [
        "Liberating Structures",
        ...structure.themes,
        formatParticipation(structure),
        formatDelivery(structure),
        ...(detailedTool?.goodFor ?? []),
        ...(structure.inDevelopment ? ["In development"] : []),
      ],
      searchIndex: [
        structure.title,
        structure.blurb,
        ...structure.themes,
        formatParticipation(structure),
        formatDelivery(structure),
        structure.time,
        ...(detailedTool?.unlocks ?? []),
        ...(detailedTool?.useWhen ?? []),
        ...(detailedTool?.questions ?? []),
        structure.inDevelopment ? "in development" : "",
      ],
    };
  });

  return [...servantLeadershipItems, ...liberatingStructuresItems];
}

function findDetailedLsTool(structureId) {
  const detailMap = {
    "ls-1-2-4-all": "one-two-four-all",
    "ls-triz": "triz",
    "ls-troika-consulting": "troika-consulting",
    "ls-15-solutions": "fifteen-percent-solutions",
    "ls-ecocycle-planning": "ecocycle-planning",
    "ls-winfy": "winfy",
  };

  const detailId = detailMap[structureId];
  if (!detailId) {
    return null;
  }

  return tools.find((tool) => tool.id === detailId) ?? null;
}

function getLsSourceUrl(structureId) {
  const sourceMap = {
    "ls-1-2-4-all": "https://liberatingstructures.info/liberating-structure/1-2-4-all/",
    "ls-impromptu-networking": "https://liberatingstructures.info/liberating-structure/impromptu-networking/",
    "ls-nine-whys": "https://liberatingstructures.info/liberating-structure/nine-whys/",
    "ls-triz": "https://liberatingstructures.info/liberating-structure/triz/",
    "ls-w3": "https://liberatingstructures.info/liberating-structure/what-so-what-now-what/",
    "ls-appreciative-interviews": "https://liberatingstructures.info/liberating-structure/appreciative-interviews/",
    "ls-troika-consulting": "https://liberatingstructures.info/liberating-structure/troika-consulting/",
    "ls-15-solutions": "https://liberatingstructures.info/liberating-structure/15-solutions/",
    "ls-25-10-crowd-sourcing": "https://liberatingstructures.info/liberating-structure/25-10-crowd-sourcing/",
    "ls-ecocycle-planning": "https://liberatingstructures.info/liberating-structure/ecocycle-planning/",
    "ls-conversation-cafe": "https://liberatingstructures.info/liberating-structure/conversation-cafe/",
    "ls-wicked-questions": "https://liberatingstructures.info/liberating-structure/wicked-questions/",
    "ls-min-specs": "https://liberatingstructures.info/liberating-structure/min-specs/",
    "ls-user-experience-fishbowl": "https://liberatingstructures.info/liberating-structure/user-experience-fishbowl/",
    "ls-hsr": "https://liberatingstructures.info/liberating-structure/heard-seen-respected/",
    "ls-p2p": "https://liberatingstructures.info/liberating-structure/purpose-to-practice-p2p/",
    "ls-drawing-together": "https://liberatingstructures.info/liberating-structure/drawing-together/",
    "ls-options-place": "https://liberatingstructures.info/liberating-structure/options-place/",
    "ls-dad": "https://liberatingstructures.info/liberating-structure/discovery-action-dialogue-dad/",
    "ls-shift-and-share": "https://liberatingstructures.info/liberating-structure/shift-and-share/",
    "ls-improv-prototyping": "https://liberatingstructures.info/liberating-structure/improv-prototyping/",
    "ls-helping-heuristics": "https://liberatingstructures.info/liberating-structure/helping-heuristics/",
    "ls-panarchy": "https://liberatingstructures.info/liberating-structure/panarchy/",
    "ls-critical-uncertainties": "https://liberatingstructures.info/liberating-structure/critical-uncertainties/",
    "ls-simple-ethnography": "https://liberatingstructures.info/liberating-structure/simple-ethnography/",
    "ls-celebrity-interview": "https://liberatingstructures.info/liberating-structure/celebrity-interview/",
    "ls-design-storyboards": "https://liberatingstructures.info/liberating-structure/design-storyboards/",
    "ls-social-network-webbing": "https://liberatingstructures.info/liberating-structure/social-network-webbing/",
    "ls-wise-crowds": "https://liberatingstructures.info/liberating-structure/wise-crowds/",
    "ls-winfy": "https://liberatingstructures.info/liberating-structure/what-i-need-from-you/",
    "ls-agreement-certainty-matrix": "https://liberatingstructures.info/liberating-structure/agreement-certainty-matrix/",
    "ls-generative-relationships-star": "https://liberatingstructures.info/liberating-structure/generative-relationships-star/",
    "ls-integrated-autonomy": "https://liberatingstructures.info/liberating-structure/integrated-autonomy/",
    "ls-mad-tea": "https://liberatingstructures.info/liberating-structure/mad-tea/",
    "ls-spiral-journal": "https://liberatingstructures.info/liberating-structure/spiral-journal/",
    "ls-folding-spectrogram": "https://liberatingstructures.info/liberating-structure/folding-spectrogram/",
    "ls-positive-gossip": "https://liberatingstructures.info/liberating-structure/positive-gossip/",
    "ls-gallery-walk": "https://liberatingstructures.info/liberating-structure/gallery-walk/",
    "ls-network-patterning-cards": "https://liberatingstructures.info/liberating-structure/network-patterning-cards/",
    "ls-future-present": "https://liberatingstructures.info/liberating-structure/future-present/",
    "ls-talking-with-pixies": "https://liberatingstructures.info/liberating-structure/talking-with-pixies/",
    "ls-tiny-demons": "https://liberatingstructures.info/liberating-structure/tiny-demons/",
    "ls-strategy-knotworking": "https://liberatingstructures.info/liberating-structure/strategy-knotworking/",
    "ls-grief-walking": "https://liberatingstructures.info/liberating-structure/grief-walking/",
  };

  return sourceMap[structureId] ?? null;
}

const lsExecutionGuides = {
  "ls-1-2-4-all": {
    invitation:
      "Ask: What opportunities do you see for making progress on this challenge? What ideas or actions would you recommend?",
    transitionPrompts: [
      '2: "Share and build on your ideas with your partner."',
      '4: "Share your pair\'s most important ideas in your group of four."',
      'All: "What is one idea that stood out in your conversation and that you want to share with the whole group?"',
    ],
    setup: [
      "Arrange chairs or standing space so people can move into pairs and groups of four.",
      "For virtual settings, prepare breakout rooms for pairs and groups of four.",
      "Use paper, sticky notes, or a digital board so participants can capture ideas.",
      "Have one shared place ready for harvesting key insights.",
    ],
    participationFlow: [
      "1: everyone reflects individually.",
      "2: everyone shares and listens in pairs.",
      "4: everyone contributes again in groups of four.",
      "All: each group brings one strong idea back to the whole group.",
    ],
    groupConfiguration: "Individuals -> Pairs -> Groups of four -> Whole group",
    sequenceTiming: [
      "1 minute: silent self-reflection on the shared challenge.",
      "2 minutes: pairs share and build on ideas.",
      "4 minutes: pairs merge into groups of four and develop ideas.",
      "5 minutes: each group shares one important idea with the whole group.",
    ],
    onlineVersion: [
      "1 minute: silent self-reflection in the main room.",
      "2 minutes: breakout rooms in pairs.",
      "4 minutes: combine pairs into groups of four in breakout rooms.",
      "5 minutes: return to the main room and harvest one idea per group.",
    ],
    tips: [
      "Keep strict time limits with a visible timer.",
      "Frame a clear and actionable question.",
      "Model the transitions, especially for first-time participants.",
      "Ask people to build on ideas, not just repeat them.",
      "Harvest one key insight per group rather than every comment.",
    ],
    traps: [
      "Letting timing slip so energy drops and dominant voices take over.",
      "Skipping the silent reflection stage.",
      "Allowing report-outs instead of one strong insight.",
      "Using a vague invitation or forgetting the debrief.",
      "Overexplaining the process before people start.",
    ],
  },
};

function buildGenericLsSteps(structure) {
  const steps = [
    `Start by framing one clear prompt that fits the ${structure.themes.join(", ").toLowerCase()} purpose of ${structure.title}.`,
    `Explain the structure, the timebox (${structure.time}), and whether people will work as ${formatParticipation(structure).toLowerCase()}.`,
    `Run the exercise in a ${formatDelivery(structure).toLowerCase()} format and keep the facilitation light but time-bound.`,
    "Harvest the strongest patterns, decisions, or next actions before you close.",
  ];

  if (structure.themes.includes("Help")) {
    steps[0] =
      `Start with a concrete challenge or support need so ${structure.title} can unlock useful peer help quickly.`;
  }

  if (structure.themes.includes("Analyze") || structure.themes.includes("Strategize")) {
    steps[3] =
      "Finish by naming what the group learned and what should change, stop, or start next.";
  }

  return steps;
}

function populateScenarios() {
  scenarioGrid.innerHTML = "";

  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.className = "scenario-chip";
    if (scenario.lensId) {
      button.dataset.lens = scenario.lensId;
    }
    button.innerHTML = `
      <strong>${scenario.title}</strong>
      <span>${scenario.description}</span>
    `;

    button.addEventListener("click", () => {
      state.activeLensId = scenario.lensId;
      state.activeSourceId = scenario.sourceId;
      state.scenarioToolIds = scenario.recommendedToolIds.slice();
      state.searchTerm = scenario.searchTerms;
      searchInput.value = state.searchTerm;
      renderSourceFilters();
      renderLensFilters();
      renderTools();
      document.querySelector("#toolbox").scrollIntoView({ behavior: "smooth" });
    });

    scenarioGrid.appendChild(button);
  });
}

async function ensureLsExerciseDetails() {
  if (Object.keys(lsExerciseDetails).length > 0) {
    return lsExerciseDetails;
  }

  if (!lsExerciseDetailsPromise) {
    lsExerciseDetailsPromise = fetch(LS_DETAILS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load LS details: ${response.status}`);
        }

        return response.text();
      })
      .then((text) => {
        const normalized = text
          .trim()
          .replace(/^window\.lsExerciseDetails\s*=\s*/, "")
          .replace(/;$/, "");

        lsExerciseDetails = JSON.parse(normalized);
        return lsExerciseDetails;
      })
      .catch((error) => {
        console.warn("Unable to load LS details library", error);
        return lsExerciseDetails;
      });
  }

  return lsExerciseDetailsPromise;
}

function openLsLoadingDrawer(structure) {
  detailContent.innerHTML = `
    <header class="detail-header">
      <p class="eyebrow">Liberating Structures</p>
      <h2 class="detail-title">${structure.title}</h2>
      <p class="detail-subtitle">Loading full exercise guide…</p>
      <div class="detail-meta">
        <span>${structure.time}</span>
        <span>${formatParticipation(structure)}</span>
        <span>${formatDelivery(structure)}</span>
      </div>
    </header>
  `;

  detailDrawer.classList.add("open");
  detailDrawer.setAttribute("aria-hidden", "false");
}

function renderLsStepExperience(exerciseDetail) {
  if (!exerciseDetail?.designElements?.length) {
    return "";
  }

  const tabs = exerciseDetail.designElements
    .map(
      (element, index) => `
        <button
          class="detail-step-button${index === 0 ? " active" : ""}"
          type="button"
          data-detail-step="${element.step}"
        >
          ${element.label}
        </button>
      `
    )
    .join("");

  const panels = exerciseDetail.designElements
    .map(
      (element, index) => `
        <section class="detail-step-panel${index === 0 ? " active" : ""}" data-detail-panel="${element.step}">
          <p class="detail-step-kicker">${element.label}</p>
          <h5>${element.subtitle}</h5>
          <div class="detail-rich-content">
            ${element.bodyHtml}
          </div>
        </section>
      `
    )
    .join("");

  return `
    <section class="detail-section">
      <h4>The Five Design Elements</h4>
      <p class="detail-copy">${exerciseDetail.designIntro}</p>
      <div class="detail-step-shell">
        <div class="detail-step-nav" role="tablist" aria-label="Liberating Structures design elements">
          ${tabs}
        </div>
        <div class="detail-step-panels">
          ${panels}
        </div>
      </div>
    </section>
  `;
}

function initializeLsStepExperience() {
  const stepButtons = [...detailContent.querySelectorAll("[data-detail-step]")];
  const stepPanels = [...detailContent.querySelectorAll("[data-detail-panel]")];

  if (!stepButtons.length || !stepPanels.length) {
    return;
  }

  const setActiveStep = (step) => {
    stepButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.detailStep === step);
    });

    stepPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.detailPanel === step);
    });
  };

  stepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveStep(button.dataset.detailStep);
    });
  });
}

async function openLsDrawer(structureId) {
  const structure = lsStructures.find((entry) => entry.id === structureId);
  if (!structure) {
    return;
  }

  openLsLoadingDrawer(structure);
  await ensureLsExerciseDetails();

  const exerciseDetail = lsExerciseDetails[structure.id] ?? null;
  const detailedTool = findDetailedLsTool(structure.id);
  const executionGuide = lsExecutionGuides[structure.id] ?? null;
  const hasScrapedDetail = Boolean(exerciseDetail?.designElements?.length);
  const runSteps = detailedTool?.steps ?? buildGenericLsSteps(structure);
  const facilitationNotes =
    detailedTool?.facilitation ?? [
      "Keep the invitation clear and short before starting.",
      "Timebox each round visibly and protect the pace.",
      "Harvest patterns or next actions before closing the exercise.",
    ];
  const usefulQuestions =
    detailedTool?.questions ?? [
      `What became visible through ${structure.title}?`,
      "What do we want to keep, change, or act on next?",
      "What is the smallest next move we can take from this?",
    ];
  const unlocks =
    detailedTool?.unlocks ?? [
      `${structure.title} creates movement through ${structure.themes.join(", ").toLowerCase()}.`,
      `It works in a ${formatParticipation(structure).toLowerCase()} setup.`,
      `It can be facilitated ${formatDelivery(structure).toLowerCase()}.`,
    ];
  const sourceSignal =
    detailedTool?.signal ??
    `Use this when you need a ${structure.themes.join("/").toLowerCase()} exercise rather than a long discussion.`;
  const sourceUrl = exerciseDetail?.sourceUrl ?? getLsSourceUrl(structure.id);
  const sourceAction = sourceUrl
    ? `
      <a class="detail-link detail-link-primary" href="${sourceUrl}" target="_blank" rel="noreferrer">
        Open original LS page
      </a>
    `
    : "";
  const whenToUseMarkup =
    exerciseDetail?.whenToUse?.length
      ? `
      <ul class="detail-list">
        ${exerciseDetail.whenToUse.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `
      : "";
  const unlockMarkup = exerciseDetail?.unlocks
    ? `<p class="detail-copy">${exerciseDetail.unlocks}</p>`
    : `
      <ul class="detail-list">
        ${unlocks.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  const stepExperienceMarkup = hasScrapedDetail
    ? renderLsStepExperience(exerciseDetail)
    : `
    <section class="detail-section">
      <h4>How To Run It</h4>
      <ol class="detail-list">
        ${runSteps.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    </section>

    ${
      executionGuide
        ? `
    <section class="detail-section">
      <h4>Invitation</h4>
      <p class="detail-copy">${executionGuide.invitation}</p>
      <ul class="detail-list">
        ${executionGuide.transitionPrompts.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h4>Setup & Materials</h4>
      <ul class="detail-list">
        ${executionGuide.setup.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h4>Participation Flow</h4>
      <ul class="detail-list">
        ${executionGuide.participationFlow.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <p class="detail-copy">${executionGuide.groupConfiguration}</p>
    </section>

    <section class="detail-section">
      <h4>Sequence & Timing</h4>
      <ol class="detail-list">
        ${executionGuide.sequenceTiming.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    </section>

    <section class="detail-section">
      <h4>Online Version</h4>
      <ol class="detail-list">
        ${executionGuide.onlineVersion.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    </section>
    `
        : ""
    }
  `;
  const variantMarkup =
    exerciseDetail?.variants?.length
      ? exerciseDetail.variants
          .map(
            (variant) => `
              <section class="detail-section">
                <h4>${variant.title}</h4>
                ${variant.subtitle ? `<p class="detail-copy">${variant.subtitle}</p>` : ""}
                <div class="detail-rich-content">
                  ${variant.bodyHtml}
                </div>
              </section>
            `
          )
          .join("")
      : "";
  const extraMarkup =
    exerciseDetail?.extras?.length
      ? exerciseDetail.extras
          .map(
            (extra) => `
              <section class="detail-section">
                <h4>${extra.title}</h4>
                ${extra.subtitle ? `<p class="detail-copy">${extra.subtitle}</p>` : ""}
                <div class="detail-rich-content">
                  ${extra.bodyHtml}
                </div>
              </section>
            `
          )
          .join("")
      : "";
  const tipsAndTrapsMarkup =
    executionGuide && !exerciseDetail?.extras?.length
      ? `
    <section class="detail-section">
      <h4>Tips</h4>
      <ul class="detail-list">
        ${executionGuide.tips.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h4>Traps</h4>
      <ul class="detail-list">
        ${executionGuide.traps.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
    `
      : "";

  detailContent.innerHTML = `
    <header class="detail-header">
      <p class="eyebrow">Liberating Structures</p>
      <h2 class="detail-title">${structure.title}</h2>
      <p class="detail-subtitle">${structure.blurb}</p>
      <div class="detail-meta">
        <span>${structure.time}</span>
        <span>${formatParticipation(structure)}</span>
        <span>${formatDelivery(structure)}</span>
        ${structure.themes.map((theme) => `<span>${theme}</span>`).join("")}
        ${structure.inDevelopment ? "<span>In development</span>" : ""}
      </div>
    </header>

    <section class="detail-section">
      <h4>When To Use It</h4>
      <p class="detail-copy">${sourceSignal}</p>
      ${whenToUseMarkup}
    </section>

    <section class="detail-section">
      <h4>What It Unlocks</h4>
      ${unlockMarkup}
    </section>

    ${stepExperienceMarkup}

    ${variantMarkup}

    <section class="detail-section">
      <h4>Facilitator Notes</h4>
      <ul class="detail-list">
        ${facilitationNotes.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    ${tipsAndTrapsMarkup}

    <section class="detail-section">
      <h4>Useful Questions</h4>
      <ul class="detail-list">
        ${usefulQuestions.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    ${extraMarkup}

    <section class="detail-section">
      <h4>Overview</h4>
      <p class="detail-copy">${detailedTool?.summary ?? structure.blurb}</p>
    </section>

    <section class="detail-section">
      <h4>Tagging</h4>
      <ul class="detail-list">
        <li>Themes: ${structure.themes.join(", ")}</li>
        <li>Participation: ${formatParticipation(structure)}</li>
        <li>Format: ${formatDelivery(structure)}</li>
        <li>Time: ${structure.time}</li>
        ${structure.inDevelopment ? "<li>Status: In development</li>" : ""}
      </ul>
    </section>

    <div class="detail-link-row">
      ${sourceAction}
      <button class="detail-link" type="button" data-ls-theme="${structure.themes[0]}">
        More in ${structure.themes[0]}
      </button>
    </div>
  `;

  initializeLsStepExperience();

  const relatedThemeButton = detailContent.querySelector("[data-ls-theme]");
  relatedThemeButton.addEventListener("click", () => {
    state.activeSourceId = "liberating-structures";
    state.searchTerm = structure.themes[0];
    searchInput.value = state.searchTerm;
    renderSourceFilters();
    closeDrawerPanel();
    renderTools();
    document.querySelector("#toolbox").scrollIntoView({ behavior: "smooth" });
  });

  detailDrawer.classList.add("open");
  detailDrawer.setAttribute("aria-hidden", "false");
}

function populateLenses() {
  lensCards.innerHTML = "";

  lenses.forEach((lens) => {
    const card = document.createElement("article");
    card.className = "lens-card";
    card.dataset.lens = lens.id;
    card.innerHTML = `
      <p class="eyebrow">${lens.shortName}</p>
      <h3>${lens.name}</h3>
      <p>${lens.description}</p>
    `;
    lensCards.appendChild(card);
  });
}

function renderSourceFilters() {
  sourceFilters.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.className = `filter-chip${state.activeSourceId === null ? " active" : ""}`;
  allButton.dataset.scope = "all";
  allButton.textContent = "All collections";
  allButton.addEventListener("click", () => {
    state.activeSourceId = null;
    renderSourceFilters();
    renderTools();
  });
  sourceFilters.appendChild(allButton);

  sources.forEach((source) => {
    const button = document.createElement("button");
    button.className = `filter-chip${state.activeSourceId === source.id ? " active" : ""}`;
    button.dataset.source = source.id;
    button.textContent = source.name;
    button.addEventListener("click", () => {
      state.activeSourceId = state.activeSourceId === source.id ? null : source.id;
      renderSourceFilters();
      renderTools();
    });
    sourceFilters.appendChild(button);
  });
}

function renderLensFilters() {
  lensFilters.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.className = `filter-chip${state.activeLensId === null ? " active" : ""}`;
  allButton.dataset.scope = "all";
  allButton.textContent = "All lenses";
  allButton.addEventListener("click", () => {
    state.activeLensId = null;
    renderLensFilters();
    renderTools();
  });
  lensFilters.appendChild(allButton);

  lenses.forEach((lens) => {
    const button = document.createElement("button");
    button.className = `filter-chip${state.activeLensId === lens.id ? " active" : ""}`;
    button.dataset.lens = lens.id;
    button.textContent = lens.name;
    button.addEventListener("click", () => {
      state.activeLensId = state.activeLensId === lens.id ? null : lens.id;
      renderLensFilters();
      renderTools();
    });
    lensFilters.appendChild(button);
  });
}

function getFilteredTools() {
  const normalizedSearch = state.searchTerm.trim().toLowerCase();
  const catalogItems = getCatalogItems();

  return catalogItems.filter((tool) => {
    const lensMatch = !state.activeLensId || tool.lensId === state.activeLensId;
    const sourceMatch = !state.activeSourceId || tool.sourceId === state.activeSourceId;
    const scenarioMatch =
      state.scenarioToolIds.length === 0 || state.scenarioToolIds.includes(tool.id);

    const searchMatch =
      !normalizedSearch ||
      [
        tool.title,
        tool.summary,
        tool.signal,
        sourceName(tool.sourceId),
        lensName(tool.lensId),
        ...(tool.unlocks ?? []),
        ...(tool.useWhen ?? []),
        ...(tool.goodFor ?? []),
        ...(tool.questions ?? []),
        ...(tool.searchIndex ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    return lensMatch && sourceMatch && scenarioMatch && searchMatch;
  });
}

function renderTools() {
  toolGrid.innerHTML = "";

  const filtered = getFilteredTools();
  const catalogItems = getCatalogItems();
  const activeSourceText = state.activeSourceId ? sourceName(state.activeSourceId) : "all collections";

  resultCount.textContent =
    filtered.length === catalogItems.length
      ? `Showing the full catalog: ${catalogItems.length} items.`
      : `Showing ${filtered.length} of ${catalogItems.length} items from ${activeSourceText}.`;

  if (filtered.length === 0) {
    const empty = document.createElement("article");
    empty.className = "tool-card";
    empty.innerHTML = `
      <div class="tool-card-top">
        <div class="tool-card-meta">
          <p class="tool-source">No match</p>
          <h3>Try widening the search</h3>
        </div>
      </div>
      <p class="tool-summary">
        Clear the current filters or try broader words like participation, autonomy, stakeholder, flow, or reflection.
      </p>
    `;
    toolGrid.appendChild(empty);
    return;
  }

  filtered.forEach((tool) => {
    const fragment = cardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".tool-card");
    const cardTags =
      tool.kind === "ls"
        ? tool.goodFor.slice(0, 4)
        : [sourceName(tool.sourceId), ...tool.goodFor].slice(0, 4);

    card.dataset.lens = tool.lensId;
    card.dataset.source = tool.sourceId;

    fragment.querySelector(".tool-source").textContent = sourceName(tool.sourceId);
    fragment.querySelector(".tool-lens").textContent = lensName(tool.lensId);
    fragment.querySelector("h3").textContent = tool.title;
    fragment.querySelector(".tool-time").textContent = tool.time;
    fragment.querySelector(".tool-summary").textContent = tool.summary;
    fragment.querySelector(".tool-signal").textContent = tool.signal;

    const tagList = fragment.querySelector(".tag-list");
    cardTags.forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      tagList.appendChild(li);
    });

    fragment.querySelector(".card-button").addEventListener("click", () => {
      if (tool.kind === "ls") {
        openLsDrawer(tool.id);
        return;
      }

      openDrawer(tool.id);
    });

    toolGrid.appendChild(fragment);
  });
}

function openDrawer(toolId) {
  const tool = tools.find((entry) => entry.id === toolId);
  if (!tool) {
    return;
  }

  const sourceAction =
    tool.sourceId === "liberating-structures"
      ? ""
      : `
      <a class="detail-link detail-link-primary" href="${tool.sourceUrl}" target="_blank" rel="noreferrer">
        ${tool.sourceLabel}
      </a>
    `;

  detailContent.innerHTML = `
    <header class="detail-header">
      <p class="eyebrow">${sourceName(tool.sourceId)}</p>
      <h2 class="detail-title">${tool.title}</h2>
      <p class="detail-subtitle">${tool.summary}</p>
      <div class="detail-meta">
        <span>${tool.time}</span>
        <span>${lensName(tool.lensId)}</span>
        ${tool.goodFor.slice(0, 3).map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </header>

    <section class="detail-section">
      <h4>Best Used When</h4>
      <p class="detail-copy">${tool.signal}</p>
      <ul class="detail-list">
        ${tool.useWhen.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h4>What It Unlocks</h4>
      <ul class="detail-list">
        ${tool.unlocks.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h4>How To Run It</h4>
      <ol class="detail-list">
        ${tool.steps.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    </section>

    <section class="detail-section">
      <h4>Facilitator Notes</h4>
      <ul class="detail-list">
        ${tool.facilitation.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h4>Useful Questions</h4>
      <ul class="detail-list">
        ${tool.questions.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h4>Core Question</h4>
      <p class="detail-quote">${tool.quote}</p>
    </section>

    <div class="detail-link-row">
      ${sourceAction}
      <button class="detail-link" type="button" data-related-source="${tool.sourceId}">
        More from this collection
      </button>
      <button class="detail-link" type="button" data-related-lens="${tool.lensId}">
        More in this lens
      </button>
    </div>
  `;

  const relatedSourceButton = detailContent.querySelector("[data-related-source]");
  relatedSourceButton.addEventListener("click", () => {
    state.activeSourceId = tool.sourceId;
    state.activeLensId = null;
    state.scenarioToolIds = [];
    renderSourceFilters();
    renderLensFilters();
    renderTools();
    closeDrawerPanel();
    document.querySelector("#toolbox").scrollIntoView({ behavior: "smooth" });
  });

  const relatedLensButton = detailContent.querySelector("[data-related-lens]");
  relatedLensButton.addEventListener("click", () => {
    state.activeLensId = tool.lensId;
    state.scenarioToolIds = [];
    renderLensFilters();
    renderTools();
    closeDrawerPanel();
    document.querySelector("#toolbox").scrollIntoView({ behavior: "smooth" });
  });

  detailDrawer.classList.add("open");
  detailDrawer.setAttribute("aria-hidden", "false");
}

function closeDrawerPanel() {
  detailDrawer.classList.remove("open");
  detailDrawer.setAttribute("aria-hidden", "true");
}

searchInput.addEventListener("input", (event) => {
  state.searchTerm = event.target.value;
  state.scenarioToolIds = [];
  renderTools();
});

clearFilters.addEventListener("click", () => {
  state.activeLensId = null;
  state.activeSourceId = null;
  state.searchTerm = "";
  state.scenarioToolIds = [];
  searchInput.value = "";
  renderSourceFilters();
  renderLensFilters();
  renderTools();
});

detailBackdrop.addEventListener("click", closeDrawerPanel);
closeDrawer.addEventListener("click", closeDrawerPanel);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawerPanel();
  }
});

openRecommended.addEventListener("click", () => {
  state.activeLensId = null;
  state.activeSourceId = null;
  state.scenarioToolIds = [
    "why-what-how",
    "support-autonomy",
    "ls-1-2-4-all",
    "ls-triz",
    "ls-winfy",
    "value-stream-mapping",
  ];
  state.searchTerm = "";
  searchInput.value = "";
  renderSourceFilters();
  renderLensFilters();
  renderTools();
  document.querySelector("#toolbox").scrollIntoView({ behavior: "smooth" });
});

populateScenarios();
populateLenses();
renderSourceFilters();
renderLensFilters();
renderTools();
