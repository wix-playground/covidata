import { getBadgeColor, sliceToNLast } from '../utils/helper-methods'

describe('Logic for obtaining last N data points for graph', () => {
  it('should return [] for an empty dataset', () => {
    expect(sliceToNLast([], 0)).toEqual([])
    expect(sliceToNLast([], 1)).toEqual([])
  })

  it('should return all elements when input array size <= N', () => {
    expect(sliceToNLast([1], 5)).toEqual([1])
    expect(sliceToNLast([1], 1)).toEqual([1])
  })

  it('should return last n elements when input array size > N', () => {
    expect(sliceToNLast([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5])
  })
})

describe('BackgroundColor logic', () => {
  it('should return "green" for 0 deaths/cases OR > 0 recoveries', () => {
    expect(getBadgeColor(0)).toEqual('green')
    expect(getBadgeColor(10, true)).toEqual('green')
  })

  it('should return "red" ("orange") for > 0 deaths/cases (0 recoveries)', () => {
    expect(getBadgeColor(1)).toEqual('red')
    expect(getBadgeColor(0, true)).toEqual('orange')
  })
})
