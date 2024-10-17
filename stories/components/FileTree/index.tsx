import * as React from 'react'
import { IFileTree } from './typings'

import './index.scss'
import { FOLDER_ICON, getFileIcon } from './helpers';

export interface FileTreeProps {
  data?: IFileTree[];
}

function getFileNameClass(highlight: boolean) {
	return highlight ? "FileTree-filename FileTree-filename--highlight" : "FileTree-filename"
}

function Directory(props: FileTreeItemProps) {
	const children = props.children
	const fileName = props.fileName

	return (<li className="FileTree-directory">
		<details>
			<summary className="FileTree-summary"><span className={getFileNameClass(!!props.configure?.highlight)}>{FOLDER_ICON}<span>{fileName}</span></span></summary>
			<FileTree data={children}></FileTree>
		</details>
	</li>)
}

function File(props: FileTreeItemProps) {
  const fileName = props.fileName
	const fileIcon = getFileIcon(fileName)
  return (
    <li className="FileTree-file">
			<span className={getFileNameClass(!!props.configure?.highlight)}>{fileIcon}<span>{fileName}</span></span>
    </li>
  );
}

type FileTreeItemProps = IFileTree

function FileTreeItem(props: FileTreeItemProps) {
	// 判断是否是数组
	const children = ((!props.children || !props.children.length) && props.fileName.endsWith('/')) ? [{ fileName: '...' }] : props.children
  const isDirectory = !!children;

  const Component = isDirectory ? Directory : File;
  return <Component fileName={props.fileName} children={children} configure={props.configure}></Component>;
}

export function FileTree(props: FileTreeProps) {
	if (!props.data) {
		return <></>
	}
	return <ul className="FileTree">{props.data.map((item, index) => <FileTreeItem key={item.fileName + '-' + index} {...item} />)}</ul>
}
