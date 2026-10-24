import { useEffect, useRef, useState } from 'react';
import { ArrowCounterClockwise, ArrowRight, Check, DownloadSimple } from '@phosphor-icons/react';
import { axes } from '../quiz';
import type { Axis, Role } from '../quiz';
import { StarMark } from './StarMark';
import { createResultCard } from '../export-card';

export function Result({ result, onEdit, onRestart }: {
  result: { role: Role; scores: Record<Axis, number> };
  onEdit: () => void;
  onRestart: () => void;
}) {
  const { role, scores } = result;
  const [unlocked, setUnlocked] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const active = useRef(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const imageHeading = useRef<HTMLHeadingElement>(null);
  const detailsHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    active.current = true;
    heading.current?.focus();
    return () => { active.current = false; };
  }, []);
  useEffect(() => () => { if (imageUrl) URL.revokeObjectURL(imageUrl); }, [imageUrl]);
  useEffect(() => { if (imageUrl) imageHeading.current?.focus(); }, [imageUrl]);
  useEffect(() => { if (unlocked) detailsHeading.current?.focus(); }, [unlocked]);

  async function exportCard() {
    setExporting(true);
    setError('');
    try {
      const blob = await createResultCard(role);
      if (active.current) setImageUrl(URL.createObjectURL(blob));
    } catch (cause) {
      if (active.current) setError(cause instanceof Error ? cause.message : '图片生成失败，请重试。');
    } finally {
      if (active.current) setExporting(false);
    }
  }

  return (
    <main className="result-page page-width">
      <div className="result-topline">
        <span><Check size={17} aria-hidden="true" /> 12 个选择，拼出此刻的你</span>
        <button className="text-button" onClick={onEdit}>修改答案 <ArrowRight aria-hidden="true" /></button>
      </div>
      <div className="result-layout">
        <section className="result-portrait" aria-label="你的星系角色">
          <div className="portrait-edition"><span>星系角色图鉴</span><span>{String(role.mark + 1).padStart(2, '0')} / 08</span></div>
          <StarMark mark={role.mark} />
          <h1 ref={heading} tabIndex={-1}>{role.name}</h1>
          <p className="role-english">{role.english}</p>
          <p className="role-quote">{role.quote}</p>
          <div className="trait-list">{role.traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
          <p className="portrait-footnote">一张此刻的剪影，不是对你的定义。</p>
        </section>
        <div className="result-reading">
          <h2>原来，我也有这样的光。</h2>
          <p className="description">{role.description}</p>
          <section className="axis-section" aria-labelledby="axis-title">
            <h3 id="axis-title">这次选择里的你</h3>
            {axes.map((axis) => (
              <div className="axis" key={axis.id}>
                <div className="axis-labels"><span>{axis.left}</span><span>{axis.right}</span></div>
                <div className="axis-track" role="meter" aria-label={`${axis.left}至${axis.right}`} aria-valuemin={0} aria-valuemax={12} aria-valuenow={scores[axis.id]} aria-valuetext={`${scores[axis.id]} / 12，本次答题倾向`}>
                  <span className="axis-midpoint" />
                  <span className="axis-marker" style={{ left: `${scores[axis.id] / 12 * 100}%` }} />
                </div>
              </div>
            ))}
            <p className="fine-print">仅呈现本次题目得分，不是能力高低或人格概率。</p>
          </section>
          <section className="unlock-panel" aria-label="完整图鉴体验">
            <div className="unlock-heading"><h3>认识自己，再多一点。</h3><span>拟售 ¥2.9</span></div>
            <p>相处偏好、表达方式、小提醒，以及一个今天就能尝试的行动。</p>
            {!unlocked ? <button className="button primary" onClick={() => setUnlocked(true)}>演示解锁完整图鉴 <ArrowRight aria-hidden="true" /></button>
              : <p className="unlock-success" role="status"><Check aria-hidden="true" /> 已演示解锁 · 未发生支付</p>}
            <p className="fine-print">本地原型，本次免费体验，无需付款。</p>
          </section>
        </div>
      </div>

      {unlocked && <section className="full-reading" aria-labelledby="reading-title">
        <div className="section-heading"><h2 id="reading-title" ref={detailsHeading} tabIndex={-1}>给{role.name}的一封小笺</h2><p>把合适的留下，不合适的也不必认领。</p></div>
        <div className="reading-grid">{role.details.map((detail) => <article key={detail.title}><h3>{detail.title}</h3><p>{detail.text}</p></article>)}</div>
      </section>}

      <section className="save-section" aria-labelledby="save-title">
        <div><h2 id="save-title">把这一刻的自己，收好。</h2><p>生成一张专属结果卡，保存在手机里，或分享给懂你的人。</p></div>
        <button className="button primary" onClick={exportCard} disabled={exporting} aria-busy={exporting}>
          <DownloadSimple size={20} aria-hidden="true" />{exporting ? '正在生成图片…' : '生成我的结果卡'}
        </button>
      </section>
      {error && <p className="error-message" role="alert">{error}</p>}
      {imageUrl && <section className="export-preview" aria-label="结果卡预览">
        <h3 ref={imageHeading} tabIndex={-1}>结果卡已生成</h3>
        <p>点击下载；如果手机浏览器拦截下载，可长按图片保存。</p>
        <img src={imageUrl} alt={`${role.name}结果卡：${role.quote}原创娱乐问卷，非心理测评。`} width={1080} height={1440} />
        <a className="button primary" href={imageUrl} download={`星系图鉴-${role.name}.png`}><DownloadSimple aria-hidden="true" /> 下载 PNG 图片</a>
      </section>}
      <div className="result-bottom"><button className="text-button" onClick={onRestart}><ArrowCounterClockwise aria-hidden="true" /> 清空并重新开始</button><span>答案只在当前页面，刷新即清空。</span></div>
    </main>
  );
}
