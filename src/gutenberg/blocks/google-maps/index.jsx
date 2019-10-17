/**
 * Import CSS
 */
import './editor.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import getIcon from '../../utils/get-icon';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

const { name } = metadata;

export { metadata, name };

export const settings = {
    ...metadata,
    title: __( 'Google Maps' ),
    description: __( 'Show maps with custom styles, markers and settings.' ),
    icon: getIcon( 'block-google-maps', true ),
    keywords: [
        __( 'maps' ),
        __( 'google' ),
    ],
    ghostkit: {
        previewUrl: 'https://ghostkit.io/blocks/google-maps/',
        supports: {
            styles: true,
            spacings: true,
            display: true,
            scrollReveal: true,
            customCSS: true,
        },
    },
    edit,
    save,
    deprecated,
};
