import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

async function finishQuiz(user: ReturnType<typeof userEvent.setup>, answers = Array(12).fill(0)) {
  for (let index = 0; index < 12; index += 1) {
    await user.click(screen.getAllByRole('radio')[answers[index]]);
    await user.click(screen.getByRole('button', { name: index === 11 ? '查看我的角色' : '下一题' }));
  }
}

describe('quiz experience', () => {
  it('supports answering and advancing with the keyboard', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '发现我的星系' }));
    await user.tab();
    await user.keyboard(' ');
    expect(screen.getAllByRole('radio')[0]).toBeChecked();
    await user.keyboard('{ArrowRight}');
    expect(screen.getAllByRole('radio')[1]).toBeChecked();
    await user.tab();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('heading', { name: '突然空出一个下午，你更想怎么过？' })).toHaveFocus();
  });

  it('requires a choice and retains it when going back', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '发现我的星系' }));
    expect(screen.getByRole('button', { name: '下一题' })).toBeDisabled();
    await user.click(screen.getAllByRole('radio')[2]);
    expect(screen.getByText('来到一场不太熟悉的聚会，你通常会……')).toBeVisible();
    await user.click(screen.getByRole('button', { name: '下一题' }));
    expect(screen.getAllByRole('radio').every((radio) => !(radio as HTMLInputElement).checked)).toBe(true);
    await user.click(screen.getByRole('button', { name: '上一题' }));
    expect(screen.getAllByRole('radio')[2]).toBeChecked();
  });

  it('shows a real result and only reveals full content via explicit demo unlock', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '发现我的星系' }));
    await finishQuiz(user);
    expect(screen.getByRole('heading', { name: '观察者', level: 1 })).toBeVisible();
    expect(screen.queryByRole('heading', { name: '你的相处偏好' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '演示解锁完整图鉴' }));
    expect(screen.getByRole('heading', { name: '你的相处偏好' })).toBeVisible();
    expect(screen.getByText(/已演示解锁.*未发生支付/)).toBeVisible();
  });

  it('recalculates edited answers and clears the previous unlock', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '发现我的星系' }));
    await finishQuiz(user);
    await user.click(screen.getByRole('button', { name: '演示解锁完整图鉴' }));
    await user.click(screen.getByRole('button', { name: '修改答案' }));
    await finishQuiz(user, [3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(screen.getByRole('heading', { name: '构筑者', level: 1 })).toBeVisible();
    expect(screen.queryByRole('heading', { name: '你的相处偏好' })).not.toBeInTheDocument();
  });

  it('starts a fresh unanswered quiz after reset', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '发现我的星系' }));
    await finishQuiz(user);
    await user.click(screen.getByRole('button', { name: '清空并重新开始' }));
    expect(screen.getByRole('button', { name: '下一题' })).toBeDisabled();
    expect(screen.getAllByRole('radio').every((radio) => !(radio as HTMLInputElement).checked)).toBe(true);
  });

  it('returns directly to a completed result from the homepage', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '发现我的星系' }));
    await finishQuiz(user);
    await user.click(screen.getByRole('button', { name: '星系角色图鉴 STAR ATLAS，返回首页' }));
    await user.click(screen.getByRole('button', { name: '查看我的图鉴' }));
    expect(screen.getByRole('heading', { name: '观察者', level: 1 })).toBeVisible();
  });

  it('labels catalog examples and does not confuse them with scored results', async () => {
    const user = userEvent.setup();
    render(<App />);
    const catalog = screen.getByRole('region', { name: '八种角色，都是你的一种可能' });
    await user.click(within(catalog).getByRole('button', { name: /守护者/ }));
    expect(within(screen.getByTestId('role-preview')).getByText('守护者')).toBeVisible();
    expect(within(screen.getByTestId('role-preview')).getByText('角色示例 · 非你的测试结果')).toBeVisible();
  });

  it('shows the selected role beside the catalog without moving keyboard focus', async () => {
    const user = userEvent.setup();
    render(<App />);
    const catalog = screen.getByRole('region', { name: '八种角色，都是你的一种可能' });
    const keeper = within(catalog).getByRole('button', { name: /守护者/ });
    keeper.focus();
    await user.keyboard('{Enter}');
    const detail = within(catalog).getByRole('region', { name: '角色详情' });
    expect(within(detail).getByRole('heading', { name: '守护者' })).toBeVisible();
    expect(within(detail).getByText('你让平常的日子，也有被接住的温度。')).toBeVisible();
    expect(within(detail).getByText('角色示例 · 非你的测试结果')).toBeVisible();
    expect(keeper).toHaveAttribute('aria-pressed', 'true');
    expect(keeper).toHaveFocus();

    await user.click(within(catalog).getByRole('button', { name: /观察者/ }));
    expect(within(detail).getByRole('heading', { name: '观察者' })).toBeVisible();
    expect(within(detail).queryByRole('heading', { name: '守护者' })).not.toBeInTheDocument();
    expect(keeper).toHaveAttribute('aria-pressed', 'false');
  });

  it('never sends or persists questionnaire responses', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '发现我的星系' }));
    await finishQuiz(user);
    await user.click(screen.getByRole('button', { name: '演示解锁完整图鉴' }));
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(storageSpy).not.toHaveBeenCalled();
  });
});
