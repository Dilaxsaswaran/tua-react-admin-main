import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DefinedGraph = () => {
	const svgRef = useRef(null);

	useEffect(() => {
		const width = 800;
		const height = 600;

		const svg = d3.select(svgRef.current)
			.attr('width', width)
			.attr('height', height);

		const nodes = [
			{ id: 'A', x: 100, y: 100 },
			{ id: 'B', x: 200, y: 200 },
			{ id: 'C', x: 300, y: 300 },
			{ id: 'D', x: 400, y: 200 },
			{ id: 'E', x: 500, y: 100 },
		];

		const links = [
			{ source: 'A', target: 'B', weight: 1 },
			{ source: 'B', target: 'C', weight: 0.7 },
			{ source: 'C', target: 'D', weight: 1 },
			{ source: 'D', target: 'E', weight: 1 },
			{ source: 'E', target: 'A', weight: 0.8 },
			{ source: 'C', target: 'C', weight: 0.2 },
		];

		const link = svg.append('g')
			.selectAll('line')
			.data(links)
			.enter()
			.append('line')
			.attr('marker-end', 'url(#arrowhead)')
			.style('stroke', '#333')
			.style('stroke-width', 4);

		const selfLoop = svg.append('g')
			.selectAll('path')
			.data(links.filter((link) => link.source === link.target))
			.enter()
			.append('path')
			.attr('d', (d) => {
				const x = 0;
				const y = 0;
				const radius = 50;
				const lineLength = 15;
				return `M${x - radius},${y}A${radius},${radius} 0 1,0 ${x + radius},${y}M${x - radius - 2},${y}H${y + lineLength}M${x + radius + 2},${y}H${y + lineLength}`;
			})
			.style('fill', 'none')
			.style('stroke', '#333')
			.style('stroke-width', 4);

		const node = svg.append('g')
			.selectAll('circle')
			.data(nodes)
			.enter()
			.append('circle')
			.attr('r', 20)
			.style('fill', '#349eff')
			.call(d3.drag()
				.on('start', dragStarted)
				.on('drag', dragged)
				.on('end', dragEnded));

		const nodeLabels = svg.append('g')
			.selectAll('text')
			.data(nodes)
			.enter()
			.append('text')
			.text((d) => d.id)
			.attr('x', (d) => d.x)
			.attr('y', (d) => d.y + 6)
			.style('text-anchor', 'middle')
			.style('fill', '#000000')
			.style('font-size', '20px')
			.call(d3.drag()
				.on('start', dragStarted)
				.on('drag', dragged)
				.on('end', dragEnded));

		const linkText = svg.append('g')
			.selectAll('text')
			.data(links)
			.enter()
			.append('text')
			.attr('text-anchor', 'middle')
			.text((d) => d.weight)
			.attr('x', (d) => (getNodePosition(d.source).x + getNodePosition(d.target).x) / 2)
			.attr('y', (d) => (getNodePosition(d.source).y + getNodePosition(d.target).y) / 2 - 7)
			.style('fill', '#000000')
			.style('font-size', '16px')
			.on('dblclick', handleLinkTextDoubleClick);

		link
			.attr('x1', (d) => getNodePosition(d.source).x)
			.attr('y1', (d) => getNodePosition(d.source).y)
			.attr('x2', (d) => getNodePosition(d.target).x)
			.attr('y2', (d) => getNodePosition(d.target).y);

		node
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y);

		selfLoop.attr('transform', (d) => {
			const x = getNodePosition(d.source).x;
			const y = getNodePosition(d.source).y;
			return `translate(${x},${y})`;
		});

		function getNodePosition(nodeId) {
			const foundNode = nodes.find((node) => node.id === nodeId);
			return foundNode ? { x: foundNode.x, y: foundNode.y } : { x: 0, y: 0 };
		}

		function dragStarted(event, d) {
			d3.select(this).raise().classed('active', true);
		}

		function dragged(event, d) {
			d3.select(this).attr('cx', d.x = event.x).attr('cy', d.y = event.y);
			updateLinks();
			updateLinkTexts();
			updateSelfLoops();
			updateNodeLabels();
		}

		function dragEnded(event, d) {
			d3.select(this).classed('active', false);
		}

		function updateLinks() {
			link
				.attr('x1', (d) => getNodePosition(d.source).x)
				.attr('y1', (d) => getNodePosition(d.source).y)
				.attr('x2', (d) => getNodePosition(d.target).x)
				.attr('y2', (d) => getNodePosition(d.target).y);
		}

		function updateLinkTexts() {
			linkText
				.attr('x', (d) => (getNodePosition(d.source).x + getNodePosition(d.target).x) / 2)
				.attr('y', (d) => (getNodePosition(d.source).y + getNodePosition(d.target).y) / 2 - 7);
		}

		function updateSelfLoops() {
			selfLoop.attr('transform', (d) => {
				const x = getNodePosition(d.source).x;
				const y = getNodePosition(d.source).y;
				return `translate(${x},${y})`;
			});
		}

		function updateNodeLabels() {
			nodeLabels
				.attr('x', (d) => d.x)
				.attr('y', (d) => d.y + 6);
		}

		function handleLinkTextDoubleClick(event, d) {
			const { x, y } = event.target.getBoundingClientRect();
			const textElement = d3.select(event.target);

			const foreignObject = linkText
				.append('foreignObject')
				.attr('x', x)
				.attr('y', y)
				.attr('width', 60)
				.attr('height', 20);

			const input = foreignObject
				.append('xhtml:input')
				.style('width', '100%')
				.style('height', '100%')
				.style('padding', '0px')
				.style('margin', '0px')
				.style('border', 'none')
				.style('outline', 'none')
				.style('font-size', '16px')
				.attr('contentEditable', true)
				.text(textElement.text())
				.on('blur', handleInputBlur);

			input.node().focus();

			textElement.style('display', 'none');

			function handleInputBlur() {
				const newText = input.node().value;
				textElement.text(newText);
				textElement.style('display', 'block');
				foreignObject.remove();
			}
		}

		const arrowhead = svg.append('defs')
			.append('marker')
			.attr('id', 'arrowhead')
			.attr('viewBox', '-10 -10 20 20')
			.attr('refX', 25)
			.attr('refY', 0)
			.attr('markerWidth', 4)
			.attr('markerHeight', 4)
			.attr('orient', 'auto')
			.append('path')
			.attr('d', 'M-10,-10 L0,0 L-10,10')
			.attr('fill', '#333');

		return () => {
			svg.selectAll('*').remove();
		};
	}, []);

	return <svg ref={svgRef}></svg>;
};

export default DefinedGraph;
