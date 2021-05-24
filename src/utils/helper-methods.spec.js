import {getBadgeColor, sliceToNLast} from './helper-methods';

describe('Helper methods', () => {
  describe('Logic for obtaining last N data points for graph', () => {
    it('should return [] for an empty dataset', () => {
      expect(sliceToNLast([], 0)).toEqual([]);
      expect(sliceToNLast([], 1)).toEqual([]);
    });

    it('should return all elements when input array size <= N', () => {
      expect(sliceToNLast([1], 5)).toEqual([1]);
      expect(sliceToNLast([1], 1)).toEqual([1]);
    });

    it('should return last n elements when input array size > N', () => {
      expect(sliceToNLast([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5]);
    });
  });

  describe('BackgroundColor for ConditionalBadge logic', () => {
    it('should return "green" for 0 deaths/cases', () => {
      expect(getBadgeColor(0)).toEqual('green');
    });

    it('should return "green" for > 0 recoveries', () => {
      expect(getBadgeColor(10, true)).toEqual('green');
    });

    it('should return "red" for > 0 deaths/cases', () => {
      expect(getBadgeColor(1)).toEqual('red');
    });

    it('should return "orange" for 0 recoveries', () => {
      expect(getBadgeColor(0, true)).toEqual('orange');
    });
  });
});
