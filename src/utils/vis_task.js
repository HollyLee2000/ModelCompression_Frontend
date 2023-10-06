import * as d3 from 'd3'
const _bisect_x = d3.bisector(d => d[1]).left

export const bisect = function (data, x) {
  const index = _bisect_x(data, x, 1)

  if (index === data.length) {
    return data[index - 1]
  }
  const a = data[index - 1]
  const b = data[index]

  return x - a[1] > b[1] - x ? b : a
}

export const disect = function (data, x) {
  let min_diff = -1
  let min_idx = 0
  for (let i = 0; i < data.length; i++) {
    let diff = Math.abs(x.getTime() - data[i][0].getTime())
    if (min_diff === -1 || diff < min_diff) {
      min_diff = diff
      min_idx = i
    }
  }
  return data[min_idx]
}

export const drawToolTip = function (g, value) {
  if (!value) return g.attr('display', 'none')

  g.attr('display', null)

  //   keep one element
  const path = g
    .selectAll('path')
    .data([null])
    .join('path')
    .attr('fill', 'white')
    .attr('stroke', 'black')

  const text = g
    .selectAll('text')
    .data([null])
    .join('text')
    .call(text =>
      text
        .selectAll('tspan')
        .data((value + '').split(/\n/))
        .join('tspan')
        .attr('x', 0)
        .attr('y', (d, i) => `${i * 1.2}em`)
        .style('font-weight', (_, i) => (i ? null : 'light'))
        .text(d => d)
    )

  const { tx, ty, width: tw, height: th } = text.node().getBBox()

  text.attr('transform', `translate(5,15)`)
  path.attr('d', `M0,0H${tw + 10}v${th + 10}H0z`)
}

export const getValidHTMLID = function (id) {
  return id.replace(/[^a-zA-Z0-9_\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}]/gu, '')
}
