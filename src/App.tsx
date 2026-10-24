import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, ShieldCheck, StarFour } from '@phosphor-icons/react';
import { questions, roles, scoreAnswers } from './quiz';
import { StarMark } from './components/StarMark';
import { Result } from './components/Result';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'quiz' | 'result'>('home');
  const [answers, setAnswers] = useState<(number | null)[]>(Array(12).fill(null));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(6);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const homeHeading = useRef<HTMLHeadingElement>(null);
  const answered = answers.filter((answer) => answer !== null).length;
  const question = questions[questionIndex];
  const preview = roles[previewIndex];

  useEffect(() => {
    if (screen === 'quiz') questionHeading.current?.focus();
    if (screen === 'home') homeHeading.current?.focus({ preventScroll: true });
  }, [screen, questionIndex]);

  function start() {
    if (answered === questions.length) {
      setScreen('result');
      return;
    }
    setQuestionIndex(Math.max(0, answers.findIndex((answer) => answer === null)));
    setScreen('quiz');
  }

  function restart() {
    setAnswers(Array(12).fill(null));
    setQuestionIndex(0);
    setScreen('quiz');
  }

  function selectAnswer(value: number) {
    setAnswers((previous) => previous.map((answer, index) => index === questionIndex ? value : answer));
  }

  function next() {
    if (answers[questionIndex] === null) return;
    if (questionIndex < questions.length - 1) setQuestionIndex(questionIndex + 1);
    else setScreen('result');
  }

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <header className="site-header page-width">
        <button className="brand" onClick={() => setScreen('home')} aria-label="星系角色图鉴 STAR ATLAS，返回首页">
          <span className="brand-symbol"><StarFour weight="light" size={29} aria-hidden="true" /></span>
          <span>星系<span className="brand-light">角色图鉴</span><small>STAR ATLAS</small></span>
        </button>
        {screen === 'home' && <nav aria-label="页面导航"><a href="#roles">角色图鉴</a><a href="#about">测试说明</a></nav>}
        <span className="prototype-label">本地体验版</span>
      </header>
      <div id="main-content" tabIndex={-1}>
        {screen === 'home' && <main>
          <section className="hero page-width" aria-labelledby="hero-title">
            <div className="hero-copy">
              <h1 id="hero-title" ref={homeHeading} tabIndex={-1}>每一种你，<br />都有自己的<span className="headline-last">引力。</span></h1>
              <p className="hero-description">12 个日常瞬间，拼出你的相处风格。<br />不定义你，只给认识自己一个新角度。</p>
              <button className="button primary hero-cta" onClick={start}>{answered === questions.length ? '查看我的图鉴' : answered ? `继续我的探索 (${answered}/12)` : '发现我的星系'} <ArrowUpRight size={23} aria-hidden="true" /></button>
            </div>
            <div className="hero-art" data-testid="role-preview">
              <div className="back-card" aria-hidden="true"><span>给自己<br />一份新的<br />认识。</span><StarFour weight="thin" /><p>BE YOUR OWN UNIVERSE</p></div>
              <article className="collectible-card">
                <div className="card-topline"><span>星系角色图鉴</span><ArrowUpRight aria-hidden="true" /></div>
                <StarMark mark={preview.mark} />
                <div className="card-title"><h2>{preview.name}</h2><span>{String(preview.mark + 1).padStart(2, '0')}<small>/ 08</small></span></div>
                <p className="role-english">{preview.english}</p>
                <p className="card-quote">{preview.quote}</p>
                <div className="card-traits">{preview.traits.join(' · ')}</div>
                <p className="sample-note">角色示例 · 非你的测试结果</p>
              </article>
            </div>
          </section>

          <div className="experience-note page-width">
            <div className="hero-facts"><span><Clock size={18} aria-hidden="true" /> 约 1 至 2 分钟</span><span><ShieldCheck size={19} aria-hidden="true" /> 不填写个人信息</span></div>
            <p className="hero-note">原创娱乐问卷，不是心理测评。当前可免费完整体验。</p>
          </div>

          <section className="catalog-section page-width" id="roles" aria-labelledby="catalog-title">
            <div className="section-heading"><h2 id="catalog-title">八种角色，都是你的一种可能</h2><p>点一个名字，翻看它的角色卡。你不需要只成为其中一种。</p></div>
            <div className="catalog-browser">
              <div className="role-catalog">{roles.map((role, index) => <button key={role.id} onClick={() => setPreviewIndex(index)} className={`catalog-item ${previewIndex === index ? 'selected' : ''}`} aria-pressed={previewIndex === index} aria-controls="catalog-detail">
                <StarMark mark={role.mark} /><span className="catalog-name">{role.name}</span><span className="catalog-trait">{role.traits[0]}</span><span className="catalog-indicator" aria-hidden="true">{previewIndex === index ? <Check size={15} /> : <ArrowUpRight size={15} />}</span>
              </button>)}</div>
              <section className="catalog-detail" id="catalog-detail" aria-label="角色详情" aria-live="polite" aria-atomic="true">
                <div className="catalog-detail-content" key={preview.id}>
                  <div className="catalog-detail-heading"><StarMark mark={preview.mark} /><div><h3>{preview.name}</h3><p className="role-english">{preview.english}</p></div></div>
                  <p className="catalog-detail-quote">{preview.quote}</p>
                  <p className="catalog-detail-traits">{preview.traits.join(' · ')}</p>
                  <p className="sample-note">角色示例 · 非你的测试结果</p>
                </div>
              </section>
            </div>
          </section>

          <section className="about-section page-width" id="about" aria-labelledby="about-title">
            <div className="about-intro"><StarFour weight="light" size={38} aria-hidden="true" /><h2 id="about-title">认识自己，<br />不用急着下结论。</h2><p>我们把日常里的小选择，写成一份轻松的角色图鉴。它是对话的起点，不是标准答案。</p></div>
            <div className="about-questions">
              <details open><summary>这是怎样的一次测试？</summary><p>12 道原创情境题，围绕表达、探索和相处偏好，按固定规则组合为 8 种角色。同样的答案会得到同样的结果。它没有科学量表的效度验证，也不用于任何健康或人生决策。</p></details>
              <details><summary>要付费吗？会收到什么？</summary><p>这是免费原型。你可以查看角色、演示解锁四部分完整文案，再生成一张 1080 × 1440 的 PNG 结果卡。¥2.9 仅是未来的定价假设；当前没有支付、订单或真实销售。</p></details>
              <details><summary>我的答案会被保存吗？</summary><p>不会上传或写入浏览器存储。答案只保留在当前页面内存，刷新或关闭就会清空。图片也在本机生成；分享卡不包含具体答案和个人信息。</p></details>
              <details><summary>为什么没有生日或星座？</summary><p>角色来自你的选择，不来自出生信息。星轨只是原创的视觉表达，不是命盘、天文观测或运势预测。</p></details>
            </div>
          </section>
        </main>}

        {screen === 'quiz' && <main className="quiz-page page-width">
          <div className="quiz-side"><StarMark mark={Math.floor(questionIndex / 2) % 8} /><p>慢一点也没关系，<br />答案没有好坏。</p><span>选此刻更像你的那个。</span></div>
          <section className="question-panel" aria-labelledby="question-title">
            <div className="question-topline"><button className="text-button" onClick={() => setScreen('home')}><ArrowLeft aria-hidden="true" /> 返回首页</button><span>已答 {answered} / 12</span></div>
            <progress className="question-progress" value={answered} max={12} aria-label="答题进度" />
            <p className="question-number">{String(questionIndex + 1).padStart(2, '0')}<span> / 12</span></p>
            <h1 id="question-title" ref={questionHeading} tabIndex={-1}>{question.title}</h1>
            <p className="question-context" id="question-context">{question.context}</p>
            <form onSubmit={(event) => { event.preventDefault(); next(); }}>
              <fieldset className="answer-options" aria-labelledby="question-title" aria-describedby="question-context">
                <legend className="visually-hidden">选择最接近你的答案</legend>
                {question.options.map((option, index) => <label key={`${questionIndex}-${index}`} className={`answer-option ${answers[questionIndex] === index ? 'chosen' : ''}`}>
                  <input type="radio" name={`question-${questionIndex}`} value={index} checked={answers[questionIndex] === index} onChange={() => selectAnswer(index)} />
                  <span className="option-letter" aria-hidden="true">{'ABCD'[index]}</span><span>{option}</span><Check className="option-check" size={19} aria-hidden="true" />
                </label>)}
              </fieldset>
              <div className="question-actions"><button type="button" className="text-button" onClick={() => setQuestionIndex(questionIndex - 1)} disabled={questionIndex === 0}><ArrowLeft aria-hidden="true" /> 上一题</button><button type="submit" className="button primary" disabled={answers[questionIndex] === null}>{questionIndex === 11 ? '查看我的角色' : '下一题'}<ArrowRight aria-hidden="true" /></button></div>
            </form>
            <p className="quiz-privacy"><ShieldCheck size={16} aria-hidden="true" /> 答案仅保留在当前页面，刷新后会清空。</p>
          </section>
        </main>}
        {screen === 'result' && <Result result={scoreAnswers(answers)} onEdit={() => { setQuestionIndex(0); setScreen('quiz'); }} onRestart={restart} />}
      </div>
      <footer className="site-footer page-width"><span><StarFour size={18} aria-hidden="true" /> 星系角色图鉴 <span className="footer-english">STAR ATLAS</span></span><p>原创娱乐问卷 · 非心理测评 · 本地演示，无真实交易</p></footer>
    </>
  );
}
