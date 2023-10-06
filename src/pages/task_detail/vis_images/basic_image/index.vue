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
    <svg :id="svg_id" />
    <b-button variant="outline-primary" size="sm" @click="download(url, '')">下载</b-button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { bisect, drawToolTip, getValidHTMLID } from '@/utils/vis_task'
import { parseTime, download } from '@/utils/index'

import * as d3 from 'd3'
export default {
  name: 'BasicImage',
  props: {
    data: {
      type: Object,
      required: true,
      validator: function (value) {
        return value.data_type == 'image'
      }
    }
  },
  data: function () {
    return {
      stroke_color: 'red',
      dot_r: 2,
      win_w: 400,
      win_h: 275,
      margin: { top: 50, bottom: 20, left: 10, right: 10 },
      selector_y: 25,
      url: ''
    }
  },
  computed: {
    svg_id: function () {
      return `basic_image_${getValidHTMLID(this.data.title)}`
    }
  },
  methods: {
    download
  },
  mounted () {
    const stroke_color = this.stroke_color,
      dot_r = this.dot_r,
      win_w = this.win_w,
      win_h = this.win_h,
      margin = this.margin,
      selector_y = this.selector_y
    const data = this.data

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data.data, (d) => d[1]))
      .range([margin.left, win_w - margin.right])

    const svg = d3
      .select(`#${this.svg_id}`)
      .attr('viewBox', [0, 0, win_w, win_h])

    svg
      .append('text')
      .attr('x', win_w / 2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .style('font-size', '15px')
      .text(data.title)

    const img = svg
      .append('image')
      .attr('width', win_w - margin.left - margin.right)
      .attr('height', win_h - margin.top - margin.bottom)
      .attr('x', margin.left)
      .attr('y', margin.top)

    const line = d3
      .line()
      .x((d) => xScale(d[1]))
      .y(selector_y)

    const selector_box = svg
      .append('path')
      .attr('fill', 'white')
      // .attr("stroke", "silver")
      .attr(
        'd',
        `M${margin.left - dot_r * 2},20H${win_w - margin.right + dot_r * 2}V${
          margin.top - 20
        }H${margin.left - dot_r * 2}z`
      )

    const selector = svg
      .append('path')
      .datum(data.data)
      .attr('d', line)
      .attr('fill', 'none')
      .style('pointer-events', 'none')
      .attr('stroke', stroke_color)
      .attr('stroke-width', 1)

    const tooltip = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top - 20})`)
      .style('pointer-events', 'none')
      .style('font', '10px sans-serif')
      .attr('display', 'none')

    const dot = svg
      .append('g')
      .append('circle')
      .attr('fill', stroke_color)
      .style('pointer-events', 'none')
      .attr('r', dot_r)

    let value
    let current

    selector_box.on('touchmove mousemove', function (d) {
      tooltip.call(drawToolTip, value)
    })

    selector_box.on('touchend mouseleave', function () {
      tooltip.call(drawToolTip, null)
    })

    function dragstarted (d) {
      tooltip.attr('display', null)
      dot.attr('r', dot_r + 1)
    }

    let that = this
    function dragged (d, i) {
      current = bisect(data.data, xScale.invert(d3.mouse(this)[0]))
      const local_time = parseTime(current[0])
      value = `Time: ${local_time}   Step: ${current[1]}`
      tooltip.call(drawToolTip, value)
      dot
        .attr('transform', `translate(${xScale(current[1])}, ${selector_y})`)
        .attr('display', null)
      img.attr('xlink:href', current[2])
      that.url = current[2]
    }
    function dragended (d) {
      dot.attr('r', dot_r)
      tooltip.call(drawToolTip, null)
    }

    const drag = d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)

    selector_box.call(drag)

    current = data.data[data.data.length - 1]
    const date = new Date(current[0])
    const local_time = date.toLocaleString('zh-Hans-CN', { hour12: false })
    value = `时间: ${local_time}   迭代: ${current[1]}`

    dot.attr('transform', `translate(${xScale(current[1])}, ${selector_y})`)
    img.attr('xlink:href', current[2])

    this.svg = svg
    this.xScale = xScale
    this.img = img
    this.selector_box = selector_box
    this.selector = selector
    this.tooltip = tooltip
    this.dot = dot
    this.drag = drag
    this.url = current[2]
  },
  updated () {
    console.log('update image')
    const stroke_color = this.stroke_color,
      dot_r = this.dot_r,
      win_w = this.win_w,
      win_h = this.win_h,
      margin = this.margin,
      selector_y = this.selector_y
    const data = this.data

    const xScale = this.xScale.domain(d3.extent(data.data, (d) => d[1]))

    const svg = this.svg
    const img = this.img

    const line = d3
      .line()
      .x((d) => xScale(d[1]))
      .y(selector_y)

    const selector_box = this.selector_box
    const selector = this.selector.datum(data.data).attr('d', line)

    const tooltip = this.tooltip.attr('display', 'none')
    const dot = this.dot

    let value
    let current

    selector_box.on('touchmove mousemove', function (d) {
      tooltip.call(drawToolTip, value)
    })

    let that = this
    function dragged (d, i) {
      current = bisect(data.data, xScale.invert(d3.mouse(this)[0]))
      const local_time = parseTime(current[0])
      value = `时间: ${local_time}   迭代: ${current[1]}`
      tooltip.call(drawToolTip, value)
      dot
        .attr('transform', `translate(${xScale(current[1])}, ${selector_y})`)
        .attr('display', null)
      img.attr('xlink:href', current[2])
      that.url = current[2]
    }

    const drag = this.drag.on('drag', dragged)
    selector_box.call(drag)

    // current = data.data[data.data.length - 1];
    // const date = image Date(current[0]);
    // const local_time = date.toLocaleString("zh-Hans-CN", { hour12: false });
    // value = `Time: ${local_time}   Step: ${current[1]}`;

    // dot.attr("transform", `translate(${xScale(current[1])}, ${selector_y})`);
    // img.attr("xlink:href", current[2]);
    // this.url = current[2];
  }
}
</script>
