<!--  Copyright 2020 Zhejiang Lab. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================
-->

<template>
  <div>
    <svg :id="svg_id"/>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {disect, drawToolTip, getValidHTMLID} from '@/utils/vis_task'
import {parseTime} from '@/utils/index'
import * as d3 from 'd3v5'


export default {
  name: 'BasicScalar',
  props: {
    data: {
      type: Object,
      required: true,
      validator: function (value) {
        return value.data_type === 'scalar'
      }
    }
  },
  data: function () {
    return {
      stroke_color: '#3B5998',
      dot_r: 3,
      win_w: 400,
      win_h: 275,
      margin: {top: 30, bottom: 55, left: 47, right: 15},
      min_ratio: 0.1,
      max_ratio: 64
    }
  },
  computed: {
    svg_id: function () {
      return `basic_scalar_${getValidHTMLID(this.data.title)}`
    },
    mask_id: function () {
      return `basic_scalar_mask_${getValidHTMLID(this.data.title)}`
    }
  },
  mounted: function () {
    const stroke_color = this.stroke_color
    const dot_r = this.dot_r
    const win_w = this.win_w
    const win_h = this.win_h
    const margin = this.margin
    const data = this.data

    const svg = d3
      .select(`#${this.svg_id}`)
      .attr('viewBox', [0, 0, win_w, win_h])
      .attr('overflow', 'visible')

    svg
      .append('text')
      .attr('x', (win_w - margin.right + margin.left) / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(data.title)

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data.data, (d) => d[0]))
      .range([margin.left, win_w - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data.data, (d) => d[2]) - 2, d3.max(data.data, (d) => d[2]) + 2])
      .range([win_h - margin.bottom, margin.top])

    const max_y = yScale.invert(margin.top)
    let x_axis_format = '%-H:%M'
    let y_axis_format = ',.5~g'

    const xAxis = (g, xScale, x_axis_format) =>
      g
        .attr('transform', `translate(0,${win_h - margin.bottom})`)
        .call(
          d3
            .axisBottom(xScale)
            .ticks(5, x_axis_format)
        )
        .selectAll('.tick line')
        .attr('y1', -(win_h - margin.bottom - margin.top))
        .attr('y2', 0)
        .attr('stroke-opacity', 0.2)

    const yAxis = (g, yScale, y_axis_format) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(
          d3
            .axisLeft(yScale)
            .tickSizeOuter(0)
            .tickFormat(d3.format(y_axis_format))
        )
        .selectAll('.tick line')
        .attr('x1', 1)
        .attr('x2', win_w - margin.right - margin.left)
        .attr('stroke-opacity', 0.2)

    const x_axis_plot = svg.append('g').call(xAxis, xScale, x_axis_format)
    const y_axis_plot = svg.append('g').call(yAxis, yScale, y_axis_format)

    svg
      .append('mask')
      .attr('id', this.mask_id)
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', win_w - margin.right - margin.left)
      .attr('height', win_h - margin.bottom - margin.top)
      .attr('fill', 'white')

    const line = d3
      .line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[2]))

    const path = svg
      .append('path')
      .datum(data.data)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', stroke_color)
      .attr('stroke-width', 1)
      .attr('mask', `url(#${this.mask_id})`)

    const tooltip = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${win_h - 35})`)
      .style('pointer-events', 'none')
      .style('font', '10px sans-serif')
      .attr('display', 'none')

    const rule_v = svg
      .append('g')
      .append('line')
      .attr('y1', win_h - margin.bottom)
      .attr('y2', margin.top)
      .attr('stroke', 'dimgray')

    const rule_h = svg
      .append('g')
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', win_w - margin.right)
      .attr('stroke', 'dimgray')

    const dot = svg
      .append('g')
      .append('circle')
      .attr('display', 'none')
      .attr('stroke', stroke_color)
      .attr('stroke-width', 1)
      .attr('fill', 'white')
      .attr('r', dot_r)

    svg.on('touchmove mousemove', function (d) {
      const now = xScale.invert(d3.mouse(this)[0])
      const current = disect(data.data, now)
      const local_time = parseTime(current[0])

      const cx = xScale(current[1])
      const cy = yScale(current[2])
      if (
        margin.left <= cx &&
          win_w - margin.right >= cx &&
          margin.top <= cy &&
          win_h - margin.bottom >= cy
      ) {
        tooltip.call(
          drawToolTip,
          `时间: ${local_time} 数值: ${current[3]}`
        )
        dot.attr('transform', `translate(${cx}, ${cy})`).attr('display', null)
        rule_v.attr('transform', `translate(${cx}, 0)`).attr('display', null)
        rule_h.attr('transform', `translate(0, ${cy})`).attr('display', null)
      }
    })

    svg.on('touchend mouseleave', function () {
      tooltip.call(drawToolTip, null)
      dot.attr('display', 'none')
      rule_v.attr('display', 'none')
      rule_h.attr('display', 'none')
    })

    // store selections in order to update.
    this.svg = svg
    this.xScale = xScale
    this.yScale = yScale
    this.xAxis = xAxis
    this.yAxis = yAxis
    this.x_axis_plot = x_axis_plot
    this.y_axis_plot = y_axis_plot
    this.line = line
    this.path = path
    this.tooltip = tooltip
    this.dot = dot
    this.rule_v = rule_v
    this.rule_h = rule_h
    // this.zoom = zoom
  },
  updated () {
    console.log('update scalar')

    const stroke_color = this.stroke_color
    const dot_r = this.dot_r
    const win_w = this.win_w
    const win_h = this.win_h
    const margin = this.margin
    const data = this.data

    const svg = this.svg
    const xScale = this.xScale.domain(d3.extent(data.data, (d) => d[0]))
    const yScale = this.yScale.domain([d3.min(data.data, (d) => d[2]) - 2, d3.max(data.data, (d) => d[2] + 2)])

    // let xScale, yScale

    const xAxis = this.xAxis
    const yAxis = this.yAxis

    const x_axis_plot = this.x_axis_plot
    const y_axis_plot = this.y_axis_plot

    const line = this.line
    const path = this.path

    const tooltip = this.tooltip.attr('display', 'none')
    const dot = this.dot.attr('display', 'none')
    const rule_v = this.rule_v.attr('display', 'none')
    const rule_h = this.rule_h.attr('display', 'none')

    const max_y = yScale.invert(margin.top)
    let x_axis_format = '%-H:%M'
    let y_axis_format = ',.5~g'

    path.datum(data.data).attr(
      'd',
      line.x((d) => xScale(d[0])).y((d) => yScale(d[2]))
    )
    x_axis_plot.call(xAxis, xScale, x_axis_format)
    y_axis_plot.call(yAxis, yScale, y_axis_format)

    svg.on('touchmove mousemove', function (d) {
      const now = xScale.invert(d3.mouse(this)[0])
      const current = disect(data.data, now)
      const local_time = parseTime(current[0])

      const cx = xScale(current[0])
      const cy = yScale(current[2])
      if (
        margin.left <= cx &&
          win_w - margin.right >= cx &&
          margin.top <= cy &&
          win_h - margin.bottom >= cy
      ) {
        tooltip.call(
          drawToolTip,
          `时间: ${local_time} 数值: ${current[3]}`
        )
        dot.attr('transform', `translate(${cx}, ${cy})`).attr('display', null)
        rule_v.attr('transform', `translate(${cx},0)`).attr('display', null)
        rule_h.attr('transform', `translate(0,${cy})`).attr('display', null)
      }
    })
  }
}
</script>
