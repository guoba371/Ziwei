import { describe, expect, it } from 'vitest';
import { scoreAnswers } from './quiz';

describe('scoreAnswers', () => {
  it.each([
    ['observer', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    ['keeper', [0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3]],
    ['navigator', [0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0]],
    ['dreamer', [0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3]],
    ['architect', [3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0]],
    ['connector', [3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3]],
    ['explorer', [3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0]],
    ['spark', [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]],
  ])('makes the %s role reachable', (id, answers) => {
    expect(scoreAnswers(answers).role.id).toBe(id);
  });

  it('uses the documented midpoint, not random tie breaking', () => {
    const answers = Object.freeze([0, 3, 1, 1, 3, 0, 2, 3, 0, 3, 3, 0]);
    const result = scoreAnswers(answers);
    expect(result.scores).toEqual({ expression: 6, discovery: 12, connection: 1 });
    expect(result.role.id).toBe('explorer');
    expect(scoreAnswers(answers)).toEqual(result);
  });

  it('recalculates when an earlier answer crosses the midpoint', () => {
    expect(scoreAnswers([0, 3, 1, 1, 3, 0, 2, 3, 0, 2, 3, 0]).role.id).toBe('navigator');
  });

  it.each([
    [], new Array(11).fill(0), new Array(13).fill(0), new Array(12),
    [null, ...new Array(11).fill(0)],
    ['3', ...new Array(11).fill(0)],
    [-1, ...new Array(11).fill(0)],
    [4, ...new Array(11).fill(0)],
    [0.5, ...new Array(11).fill(0)],
    [NaN, ...new Array(11).fill(0)],
  ])('rejects incomplete or invalid responses %#', (...answers) => {
    expect(() => scoreAnswers(answers)).toThrow();
  });
});
