export const CONTENT_VERSION = 'atlas-v1';

export type Axis = 'expression' | 'discovery' | 'connection';

export interface Role {
  id: string;
  name: string;
  english: string;
  mark: number;
  quote: string;
  traits: readonly string[];
  description: string;
  details: readonly { title: string; text: string }[];
}

export const axes: { id: Axis; left: string; right: string }[] = [
  { id: 'expression', left: '安静观察', right: '主动表达' },
  { id: 'discovery', left: '熟悉节奏', right: '新鲜体验' },
  { id: 'connection', left: '条理分析', right: '感受共鸣' },
];

export const questions: { axis: Axis; title: string; context: string; options: readonly string[] }[] = [
  {
    axis: 'expression', title: '来到一场不太熟悉的聚会，你通常会……', context: '想想最近一次类似的场景。',
    options: ['先找个舒服的位置，听大家聊天', '有人聊到感兴趣的话题时，再加入', '主动和身边的人聊几句', '向大家打招呼，开启一个新话题'],
  },
  {
    axis: 'discovery', title: '突然空出一个下午，你更想怎么过？', context: '不用考虑“应该做什么”，选你想做的。',
    options: ['回到熟悉的小店，照往常一样放松', '做熟悉的事，换一点小细节', '去收藏夹里没去过的地方', '随意出发，看看会遇到什么'],
  },
  {
    axis: 'connection', title: '朋友说“最近有点累”，你的第一反应是……', context: '四种回应都可以，只是出发点不同。',
    options: ['先问清发生了什么，帮忙梳理问题', '聊聊原因，再一起想办法', '先问问对方现在的感受', '先陪着对方，让情绪有个落脚点'],
  },
  {
    axis: 'expression', title: '讨论到你很喜欢的话题时，你会……', context: '选最接近你自然状态的一项。',
    options: ['在心里整理想法，更享受听别人说', '等合适的空隙，补充一两句', '表达自己的观点，也接住别人的话', '边聊边想，把气氛带动起来'],
  },
  {
    axis: 'discovery', title: '计划一次短途出行，你倾向于……', context: '没有更好的旅行方式，只有你的偏好。',
    options: ['选择去过、知道会喜欢的路线', '主体安排熟悉，留一点新鲜体验', '选一个新地方，提前了解一下', '保留大块空白，让途中决定方向'],
  },
  {
    axis: 'connection', title: '和朋友意见不同，你会先留意什么？', context: '不是问你会不会争论，而是更在意什么。',
    options: ['各自的依据是否清楚', '先说清事实，再考虑表达方式', '把自己的意思说清，也照顾对方感受', '对方是否觉得被理解和尊重'],
  },
  {
    axis: 'expression', title: '有个让你兴奋的小发现，你通常……', context: '它可以是一本书、一首歌，或一个念头。',
    options: ['自己慢慢品味，未必马上说出来', '只和一个很熟悉的人分享', '发给几个可能感兴趣的朋友', '很想马上讲出来，听听大家的反应'],
  },
  {
    axis: 'discovery', title: '常去的小店上了新菜单，你会……', context: '把它当作一次没有压力的小选择。',
    options: ['还是点那道一直喜欢的', '在老选择上加一份新小食', '比较一下，尝尝看起来不错的新菜', '直接试没吃过的，体验本身就有趣'],
  },
  {
    axis: 'connection', title: '收到朋友准备的礼物，最打动你的是……', context: '每一种在意，都有自己的理由。',
    options: ['它恰好解决了一个实际需要', '它好用，也能看出对方花了心思', '它呼应了你们共同的小记忆', '它让你感觉自己的喜好被认真记住'],
  },
  {
    axis: 'expression', title: '一起做决定时，你更习惯……', context: '想想一次轻松的小组合作。',
    options: ['先听完大家，再整理自己的意见', '被问到时，把想好的意见讲出来', '主动提出建议，再和大家调整', '先抛一个想法，让讨论转动起来'],
  },
  {
    axis: 'discovery', title: '学一点新东西，你喜欢怎样开始？', context: '不考虑熟练程度，只看你喜欢的过程。',
    options: ['用熟悉的学习方式，按步骤来', '先沿用熟悉方法，再做一点变化', '试一种新方法，边做边调整', '先动手探索，不急着定下路线'],
  },
  {
    axis: 'connection', title: '回想一次舒服的长谈，你最珍惜……', context: '这是最后一题，按此刻的直觉选择就好。',
    options: ['想不明白的问题，终于理顺了', '多了一种看法，也有具体的收获', '不必说得很完整，对方也愿意理解', '自己的情绪被温柔地接住了'],
  },
];

export const roles: readonly Role[] = [
  {
    id: 'observer', name: '观察者', english: 'THE OBSERVER', mark: 0,
    quote: '世界很热闹，你自有清晰的坐标。', traits: ['细腻洞察', '独立思考', '稳定节奏'],
    description: '从这次选择看，你可能更习惯先观察、再表达。在熟悉的节奏里，你会为纷杂的事情找到清楚的线索。',
    details: [
      { title: '你的相处偏好', text: '你可能更享受不必一直说话的陪伴。留一点独处空间、让关系按自己的速度生长，会比密集的社交安排更自在。' },
      { title: '你的表达方式', text: '你倾向于想清楚再开口，比起即时回应，更喜欢有条理地把意思讲完整。可以告诉朋友：“我需要想一想，但我有认真听。”' },
      { title: '容易忽略的小地方', text: '当你在心里已经理顺很多事，别人未必知道你正如何思考。偶尔说出还没成形的想法，也能为彼此留一扇窗。' },
      { title: '给你一个小行动', text: '选一位相处舒服的朋友，分享今天一个很小的发现。不用总结得漂亮，只要让对方看见你的视角。' },
    ],
  },
  {
    id: 'keeper', name: '守护者', english: 'THE KEEPER', mark: 1,
    quote: '你让平常的日子，也有被接住的温度。', traits: ['安静陪伴', '感受细节', '珍惜日常'],
    description: '从这次选择看，你可能偏爱熟悉而松弛的关系。你不一定站在热闹中央，但会留意身边人的细小感受。',
    details: [
      { title: '你的相处偏好', text: '稳定的回应和无需刻意安排的相处，可能让你更放松。一起吃顿熟悉的饭、散一小段步，就能积累真实的连接。' },
      { title: '你的表达方式', text: '你可能更常通过记住细节、陪伴和实际照顾来表达心意。把“我在意你”也偶尔说出口，可以让心意更容易被接收到。' },
      { title: '容易忽略的小地方', text: '照顾别人的感受时，也别把自己的需要排到最后。温和地说“不太方便”，并不会否定你对这段关系的重视。' },
      { title: '给你一个小行动', text: '给自己安排一件不用照顾任何人的小事。读一会书、喝一杯喜欢的饮料，把关心也分给自己。' },
    ],
  },
  {
    id: 'navigator', name: '寻路者', english: 'THE NAVIGATOR', mark: 2,
    quote: '不急着抵达，先找到自己的方向。', traits: ['独立探索', '好奇求证', '从容选择'],
    description: '从这次选择看，你可能喜欢在安静中探索新事物。比起随大流，你更想亲自弄明白，再选一条适合自己的路。',
    details: [
      { title: '你的相处偏好', text: '能一起交换新发现、又尊重彼此空间的关系，可能让你觉得舒服。不必时刻同步，重逢时有话可聊就很好。' },
      { title: '你的表达方式', text: '你常从一个具体问题切入，用观察和推理分享自己的看法。也可以留一点空间，听听别人尚未整理好的感受。' },
      { title: '容易忽略的小地方', text: '一直寻找更合适的方向，有时会让一个已经不错的选择迟迟无法开始。小范围尝试，不必等所有信息齐全。' },
      { title: '给你一个小行动', text: '从收藏夹里选一个想学的小主题，用二十分钟做一次实际尝试。结束后写下一个发现，而不是继续收藏。' },
    ],
  },
  {
    id: 'dreamer', name: '造梦者', english: 'THE DREAMER', mark: 3,
    quote: '你给日常的缝隙，留了一点想象。', traits: ['细腻想象', '共情感受', '独处灵感'],
    description: '从这次选择看，你可能在安静里拥有丰富的感受。新体验会唤起你的联想，一首歌、一段路也能打开小小的世界。',
    details: [
      { title: '你的相处偏好', text: '你可能更喜欢可以慢慢聊、允许表达不完整的关系。有人愿意听你描述一种难以命名的感觉，本身就很珍贵。' },
      { title: '你的表达方式', text: '你可能擅长用画面、比喻或作品表达心意。遇到重要需求时，再补一句直接的话，能帮助对方更清楚地理解你。' },
      { title: '容易忽略的小地方', text: '感受到很多可能，并不意味着要同时照顾它们。暂时放下一个念头，不等于失去它；留白也属于创作。' },
      { title: '给你一个小行动', text: '把今天一个微小的感受变成三句话、一张照片或几笔线条。先完成一个小表达，不必急着评价它。' },
    ],
  },
  {
    id: 'architect', name: '构筑者', english: 'THE BUILDER', mark: 4,
    quote: '把想法落在地上，日子就有了形状。', traits: ['清晰表达', '稳步行动', '条理感'],
    description: '从这次选择看，你可能喜欢把事情说清楚、安排妥当。熟悉的节奏和具体的行动，会给你可把握的踏实感。',
    details: [
      { title: '你的相处偏好', text: '清楚的约定和及时的回应，可能让你更安心。一起把一件小事做好，也是一种你熟悉的亲近方式。' },
      { title: '你的表达方式', text: '你倾向于主动提出建议，让讨论有个明确方向。分享方案之前，先问问“你想听建议，还是想先聊聊”，能减少错位。' },
      { title: '容易忽略的小地方', text: '别人节奏不同，未必是不认真。为计划留一点可调整的空白，可能比把每一步都安排好更轻松。' },
      { title: '给你一个小行动', text: '在本周的一个安排里留出半小时空白。到时候再决定怎么用，让一点即兴也能进入你的秩序。' },
    ],
  },
  {
    id: 'connector', name: '联结者', english: 'THE CONNECTOR', mark: 5,
    quote: '你把一个人的日常，连成彼此的故事。', traits: ['主动关心', '熟悉温度', '善于回应'],
    description: '从这次选择看，你可能喜欢主动维系熟悉的关系。聊天、回应和共同的小习惯，都是你与别人靠近的方式。',
    details: [
      { title: '你的相处偏好', text: '你可能珍惜有来有往的日常联系，不一定要有特别的话题。知道彼此今天过得怎样，就能感到连接仍在。' },
      { title: '你的表达方式', text: '你愿意主动分享，也容易注意到对方的情绪变化。有时一句“你现在方便聊吗”，能让关心更贴近对方的节奏。' },
      { title: '容易忽略的小地方', text: '没有及时回复，不一定等于疏远。把对回应的期待说出来，比独自猜测更有助于相处。' },
      { title: '给你一个小行动', text: '发出一次轻松、没有回复压力的邀请，例如“一起散步吗？不方便也没关系”。为连接留门，也给彼此留空间。' },
    ],
  },
  {
    id: 'explorer', name: '探索者', english: 'THE EXPLORER', mark: 6,
    quote: '比起标准答案，你更想看看另一种可能。', traits: ['好奇驱动', '主动尝试', '清晰行动'],
    description: '从这次选择看，你可能愿意把新鲜想法带进日常。你享受交换观点，也喜欢通过实际尝试找到自己的答案。',
    details: [
      { title: '你的相处偏好', text: '能一起尝试新事物、直接交流想法的关系，可能让你觉得自在。散步换条路，聊天换个视角，都能带来新鲜的连接。' },
      { title: '你的表达方式', text: '你可能喜欢主动抛出想法，让讨论往前走。也可以为安静的伙伴多等一会，让不同速度的想法都有机会被听见。' },
      { title: '容易忽略的小地方', text: '兴奋地走向下一件事之前，回头看看已经开始的尝试。有些收获不是换条路，而是多走一步才会看见。' },
      { title: '给你一个小行动', text: '挑一个最近冒出的点子，把它缩小到今天能完成的一步。试完记下真实感受，再决定要不要继续。' },
    ],
  },
  {
    id: 'spark', name: '灵感家', english: 'THE SPARK', mark: 7,
    quote: '一个小念头，也能点亮一场相遇。', traits: ['灵感分享', '感受共鸣', '拥抱新鲜'],
    description: '从这次选择看，你可能喜欢让新鲜体验和人与人的交流相互碰撞。一个有趣的念头，常常会让你想马上分享。',
    details: [
      { title: '你的相处偏好', text: '可以一起即兴、交换感受的关系，可能让你更有活力。活动不一定需要复杂，只要彼此愿意投入当下。' },
      { title: '你的表达方式', text: '你可能会用生动的讲述带动交流，也愿意回应情绪。记得给对话留一个停顿，邀请对方把自己的故事讲完。' },
      { title: '容易忽略的小地方', text: '新的邀请和想法很迷人，但精力也需要边界。错过一次热闹，并不意味着错过一段关系。' },
      { title: '给你一个小行动', text: '把今天最想做的三件事写下来，只挑一件认真体验。结束后留五分钟安静回味，不急着开始下一场。' },
    ],
  },
];

export function scoreAnswers(answers: readonly unknown[]): { role: Role; scores: Record<Axis, number> } {
  if (answers.length !== questions.length) throw new Error('请完成全部 12 道题。');
  const scores: Record<Axis, number> = { expression: 0, discovery: 0, connection: 0 };
  // Indexed iteration also rejects sparse arrays; forEach would skip their holes.
  for (let index = 0; index < questions.length; index += 1) {
    const answer = answers[index];
    if (typeof answer !== 'number' || !Number.isInteger(answer) || answer < 0 || answer > 3) {
      throw new Error('每道题都需要选择一个有效选项。');
    }
    scores[questions[index].axis] += answer;
  }
  const roleIndex = (scores.expression >= 6 ? 4 : 0)
    + (scores.discovery >= 6 ? 2 : 0) + (scores.connection >= 6 ? 1 : 0);
  return { role: roles[roleIndex], scores };
}
