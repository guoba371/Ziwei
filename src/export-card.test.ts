import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createResultCard } from './export-card';
import { roles } from './quiz';

describe('result card export', () => {
  const context = {
    fillRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(),
    closePath: vi.fn(), arc: vi.fn(), ellipse: vi.fn(), stroke: vi.fn(), fill: vi.fn(),
    save: vi.fn(), restore: vi.fn(), translate: vi.fn(), scale: vi.fn(),
    fillText: vi.fn(), measureText: (text: string) => ({ width: text.length * 26 }),
    setLineDash: vi.fn(), strokeRect: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as unknown as CanvasRenderingContext2D);
    Object.defineProperty(document, 'fonts', { configurable: true, value: { ready: Promise.resolve(), load: async () => [] } });
  });

  it('exports a 1080 x 1440 PNG containing the selected role and disclaimer', async () => {
    let dimensions: number[] = [];
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (this: HTMLCanvasElement, callback, type) {
      dimensions = [this.width, this.height];
      callback(new Blob(['encoded-image'], { type }));
    });
    const blob = await createResultCard(roles[6]);
    expect(dimensions).toEqual([1080, 1440]);
    expect(blob.type).toBe('image/png');
    const drawnText = context.fillText.mock.calls.map((call) => call[0]).join('');
    expect(drawnText).toContain('探索者');
    expect(drawnText).toContain('原创娱乐问卷 · 非心理测评');
    expect(drawnText).not.toContain('观察者');
  });

  it('rejects a failed image encoding instead of reporting success', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback) => callback(null));
    await expect(createResultCard(roles[0])).rejects.toThrow(/生成/);
  });

  it('reports when the browser cannot provide a drawing context', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    await expect(createResultCard(roles[0])).rejects.toThrow(/浏览器/);
  });
});
