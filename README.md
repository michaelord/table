---
title: Table
tags : ["all", "table", "wip"]
category: "Undefined"
logo: "./thumbnail.jpg"
icon: '<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="50" width="210" height="2" fill="var(--color-contrast-low)"></rect><rect x="25" y="148" width="210" height="2" fill="var(--color-contrast-low)"></rect><rect x="25" y="52" width="210" height="32" fill="var(--color-contrast-lower)"></rect><rect x="25" y="84" width="210" height="32" fill="var(--color-bg)"></rect><rect x="25" y="116" width="210" height="32" fill="var(--color-contrast-lower)"></rect><rect x="37" y="64" width="48" height="8" fill="var(--color-contrast-medium)"></rect><rect x="189" y="64" width="34" height="8" fill="var(--color-contrast-medium)"></rect><rect x="37" y="96" width="38" height="8" fill="var(--color-contrast-medium)"></rect><rect x="189" y="96" width="34" height="8" fill="var(--color-contrast-medium)"></rect><rect x="37" y="128" width="48" height="8" fill="var(--color-contrast-medium)"></rect><rect x="189" y="128" width="34" height="8" fill="var(--color-contrast-medium)"></rect><rect x="130" y="64" width="36" height="8" fill="var(--color-contrast-medium)"></rect><rect x="130" y="96" width="36" height="8" fill="var(--color-contrast-medium)"></rect><rect x="130" y="128" width="36" height="8" fill="var(--color-contrast-medium)"></rect><rect x="130" y="30" width="34" height="8" fill="var(--color-contrast-high)"></rect><rect x="189" y="30" width="34" height="8" fill="var(--color-contrast-high)"></rect></svg>'
published : true
---
import { Playground, PlaygroudCode } from 'components/styleguide';
import {Table} from 'components/editable';
import {TableData} from './demo';

[TODO]

## Table Row Layout

<Table
    layout="row"
    headings={[
        '',
        {label: 'Proteins', suffix: 'g', align: 'right'},
        {label: 'Carbs', suffix: 'g', align: 'right'},
        {label: 'Sugar', suffix: 'g', align: 'right'},
        {label: 'Fat', suffix: 'g', align: 'right'},
    ]}
    data={[
        ['Breakfast', 20, 30, 2, 5],
        ['Morning Snack', 10, 20, 5, 5],
        ['Lunch', 30, 50, 15, 10],
        ['Afternoon Snack', 10, 20, 5, 5],
        ['Dinner', 20, 40, 20, 10],
    ]}
/>

## Table Column Layout

<Table
    layout="column"
    headings={[
        '',
        {label: 'Spring', align: 'right'},
        {label: 'Summer', align: 'right'},
        {label: 'Autumn', align: 'right'},
        {label: 'Winter', align: 'right'},
    ]}
    data={[
        ['High Temperature', 26, 30, 25, 20],
        ['Low Temperature', 18, 20, 125, 8],
        ['Average Rainfall', '40mm', '30mm', '55mm', '50mm'],
        ['Average Rain Days', 10, 5, 15, 14],
    ]}
/>

## Table Standard Layout

<Table
    layout="standard"
    headings={[
        {label: 'Name', isSortable: true},
        'Job',
        {label: 'Salary', align: 'right', prefix: '$'},
    ]}
    data={[
        ['Olivia Saturday', 'Senior Data Engineer', '320,000'],
        ['David Smith', 'Strategic Finance Manager', '180,000'],
        ['Margaret Mills', 'Lead Software Engineer', '250,000'],
        ['Paul Brown', 'Digital Content Writer', '145,000'],
        ['Stephanie Tavartkiladze', 'Digital Project Manager', '250,000'],
    ]}
/>

## example

<Table
    layout="standard"
    headings={['Name', 'Job', {label: 'Salary', align: 'right', prefix: '$'}]}
    data={[
        ['Olivia Saturday', 'Senior Data Engineer', '320,000'],
        ['David Smith', 'Strategic Finance Manager', '180,000'],
        ['Margaret Mills', 'Lead Software Engineer', '250,000'],
        ['Paul Brown', 'Digital Content Writer', '145,000'],
        ['Stephanie Tavartkiladze', 'Digital Project Manager', '250,000'],
    ]}
/>
