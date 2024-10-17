import * as React from 'react'
import { Icons } from './Icons'
import { definitions } from './file-tree-icons'

/**
 * Get an icon from a file name based on its extension.
 * Note that an extension in Seti is everything after a dot, so `README.md` would be `.md` and
 * `name.with.dots` will try to look for an icon for `.with.dots` and then `.dots` if the first one
 * is not found.
 */
function getFileIconTypeFromExtension(fileName: string) {
	const firstDotIndex = fileName.indexOf('.');
	if (firstDotIndex === -1) return;
	let extension = fileName.slice(firstDotIndex);
	while (extension !== '') {
		const icon = definitions.extensions[extension];
		if (icon) return icon;
		const nextDotIndex = extension.indexOf('.', 1);
		if (nextDotIndex === -1) return;
		extension = extension.slice(nextDotIndex);
	}
	return;
}

/** Return the icon name for a file based on its file name. */
function getFileIconName(fileName: string) {
	let icon: string | undefined = definitions.files[fileName];
	if (icon) return icon;
	icon = getFileIconTypeFromExtension(fileName);
	if (icon) return icon;
	for (const [partial, partialIcon] of Object.entries(definitions.partials)) {
		if (fileName.includes(partial)) return partialIcon;
	}
	return icon;
}

/** Make a node containing an SVG icon from the passed HTML string. */
function makeSVGIcon(svgString: string) {
	return <span className="FileTree-icon"><svg width="16" height="16" className="tree-icon" aria-hidden="true" viewBox="0 0 24 24" dangerouslySetInnerHTML={{__html: svgString}}></svg></span>
}

export const FOLDER_ICON = makeSVGIcon(Icons['seti:folder']);
export const DEFAULT_FILE_ICON = makeSVGIcon(Icons['seti:default']);

export const MORE_ELLIPSES = '...'


/** Return the icon for a file based on its file name. */
export function getFileIcon(fileName: string) {
	if (fileName === MORE_ELLIPSES) {
		return <></>
	}
	const name = getFileIconName(fileName);
	if (!name) return DEFAULT_FILE_ICON;
	if (name in Icons) {
		const path = Icons[name as keyof typeof Icons];
		return makeSVGIcon(path);
	}
	return DEFAULT_FILE_ICON;
}
