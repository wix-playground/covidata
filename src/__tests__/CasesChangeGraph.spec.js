import {CasesChangeGraph} from '../components/CasesChangeGraph';

describe('Tests for graph building functionality', () => {
  describe('Logic for obtaining last N data points for graph', () => {
    // would it make sense for sliceToNLast be separated from the component?
    // and have it's own unit tests
    const casesChangeGraph = new CasesChangeGraph();
    it('should return [] for an empty dataset', () => {
      expect(casesChangeGraph.sliceToNLast([], 0)).toEqual([]);
      expect(casesChangeGraph.sliceToNLast([], 1)).toEqual([]);
    });
    it('should return all elements when input array size <= N', () => {
      expect(casesChangeGraph.sliceToNLast([1], 5)).toEqual([1]);
      expect(casesChangeGraph.sliceToNLast([1], 1)).toEqual([1]);
    });
    it('should return last n elements when input array size > N', () => {
      casesChangeGraph.sliceToNLast([1,2,3,4,5],)
    });
  });
});