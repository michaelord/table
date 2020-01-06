import {Toggle} from 'components/accordion';
import {Alert} from 'components/alert';
import {Definition} from 'components/editable';
import {IconOpener} from 'components/icon';
import {MatchMedia} from 'components/layout';
import {generateGUID, getModifiers} from 'components/libs';
import * as Types from 'components/types';
import React, {memo, useState} from 'react';
import './Table.scss';

type Layout = 'standard' | 'column' | 'row';

type HeadingData = {
	prefix?: string;
	suffix?: string;
	isSortable?: boolean;
	label: string;
	span?: Types.Number;
	align?: 'left' | 'right' | 'center';
};

type HeadingCell = string | HeadingData;
type DataCell = any;
type TableBody = Array<Array<DataCell>>;

export type TableProps = {
	caption?: string;
	layout?: Layout;
	headings?: Array<HeadingCell>;
	footer?: Array<HeadingCell>;
	data?: TableBody;
	view?: 'mobile' | 'desktop';
};

export const Table = memo((props: TableProps) => {
	const base: string = 'table';

	const {layout = 'standard', headings, caption, view, footer} = props;
	let {data} = props;

	if (!data || (data && data.length === 0) || !headings || (headings && headings.length === 0)) {
		return (
			<Alert type="info">
				<p>table no data</p>
			</Alert>
		);
	}

	const [sort, setSort] = useState(0);

	// TODO
	const isStriped: boolean = false;
	const isBordered: boolean = false;
	const isHover: boolean = false;

	const isCheckable: boolean = false;
	const debug: boolean = false;

	const isFirstCellHeading = !headings[0];
	const isSticky = data.length > 15;

	headings.unshift('id');

	data = data.map((row, index) => {
		row.unshift(index);
		return row;
	});

	data = data.sort((a: any, b: any) => {
		return a[Math.abs(sort)] > b[Math.abs(sort)] ? 1 : -1;
	});

	const atts: object = {
		className: getModifiers(base, {
			sticky: isSticky,
			striped: isStriped,
			hover: isHover,
			bordered: isBordered,
		}),
	};

	const getHeadingDetail = (cell: HeadingCell): HeadingData => {
		if (typeof cell === 'string') {
			return {label: cell};
		}

		return cell;
	};

	const mobile = () => {
		// https://codyhouse.co/ds/components/app/table
		if (layout === 'standard') {
			return data.map((row, index) => (
				<div className="table-block" key={`b-${index}`}>
					<Definition
						layout="side-by-side"
						data={row
							.map((cell, index) => {
								if (index === 0) {
									return null;
								}

								const {label, prefix = '', suffix = ''} = getHeadingDetail(headings[index]);

								return {
									title: label,
									content: `${prefix}${cell}${suffix}`,
								};
							})
							.filter(n => n)}
					/>
				</div>
			));
		}

		// https://codyhouse.co/ds/components/app/column-oriented-table
		if (layout === 'column') {
			return headings.map((heading, index) => {
				if (!heading || index === 0) {
					return null;
				}

				return (
					<div className="table-block" key={`c-${index}`}>
						<Toggle title={getHeadingDetail(heading).label} padding="xs">
							<Definition
								layout="side-by-side"
								data={data
									.map(row => {
										const {prefix = '', suffix = ''} = getHeadingDetail(row[1]);

										return {
											title: row[1],
											content: `${prefix}${row[index]}${suffix}`,
										};
									})
									.filter(n => n)}
							/>
						</Toggle>
					</div>
				);
			});
		}

		// https://codyhouse.co/ds/components/app/row-oriented-table
		if (layout === 'row') {
			return data.map((row, index) => {
				return (
					<div className="table-block" key={`b-${index}`}>
						<Toggle title={row[1]} padding="xs">
							<Definition
								layout="side-by-side"
								data={headings
									.map((heading, index) => {
										if (!heading || index === 0) {
											return null;
										}
										const {label, prefix = '', suffix = ''} = getHeadingDetail(heading);

										return {
											title: label,
											content: `${prefix}${row[index]}${suffix}`,
										};
									})
									.filter(n => n)}
							/>
						</Toggle>
					</div>
				);
			});
		}

		return (
			<Alert type="info">
				<p>Table Layout has not been defined</p>
			</Alert>
		);
	};

	const doSort = (column: number) => {
		if (sort === column) {
			setSort(sort * -1);
		} else {
			setSort(column);
		}

		console.log(`sort data on column ${column}`);
	};

	const prefix: string = generateGUID();

	const desktop = () => {
		return (
			<table {...atts}>
				{caption && <caption dangerouslySetInnerHTML={{__html: caption}} />}
				{headings && (
					<thead>
						<tr>
							{isCheckable && (
								<th className={`${base}__cb`}>
									<input
										type="checkbox"
										name="checkhead"
										className="checkbox"
										id={`${prefix}-head`}
									/>
									<label htmlFor={`${prefix}-head`} />
								</th>
							)}
							{headings.map((heading, index) => {
								if (index === 0 && !debug) {
									return null;
								}

								const {label, align = '', isSortable = false} = getHeadingDetail(heading);

								return (
									<th className={`align-${align}`} key={`h-${index}`}>
										{isSortable ? (
											<button
												type="button"
												onClick={ev => {
													doSort(index);
												}}
											>
												{label} <IconOpener />
											</button>
										) : (
											label
										)}
									</th>
								);
							})}
						</tr>
					</thead>
				)}
				<tbody>
					{data.map((row, index) => (
						<tr key={`r${index}`}>
							{isCheckable && (
								<td className={`${base}__cb`}>
									<input
										type="checkbox"
										name="checkhead"
										className="checkbox"
										id={`${prefix}-data-${index}`}
									/>
									<label htmlFor={`${prefix}-data-${index}`} />
								</td>
							)}
							{row.map((cell, index) => {
								if (index === 0 && !debug) {
									return null;
								}

								const {prefix = '', suffix = '', align = ''} = getHeadingDetail(headings[index]);

								const html: string = `${prefix}${cell}${suffix}`;

								return isFirstCellHeading && index === 1 ? (
									<th key={`c-${index}`} dangerouslySetInnerHTML={{__html: cell}} />
								) : (
									<td
										className={`align-${align}`}
										key={`c-${index}`}
										dangerouslySetInnerHTML={{__html: html}}
									/>
								);
							})}
						</tr>
					))}
				</tbody>

				{footer && (
					<tfoot>
						<tr>
							{footer.map((item, index) => {
								const {label, align = '', span} = getHeadingDetail(item);

								return (
									<td className={`align-${align}`} key={`f-${index}`} colSpan={span}>
										{label}
									</td>
								);
							})}
						</tr>
					</tfoot>
				)}
			</table>
		);
	};

	if (view === 'mobile') {
		return mobile();
	}

	if (view === 'desktop') {
		return desktop();
	}

	return (
		<MatchMedia query="(max-width: 900px)" fallback={desktop()}>
			{mobile()}
		</MatchMedia>
	);
});
