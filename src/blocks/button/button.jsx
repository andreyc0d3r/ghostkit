// External Dependencies.
import classnames from 'classnames/dedupe';

// Internal Dependencies.
import elementIcon from '../_icons/button.svg';

const { GHOSTKIT } = window;

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
    SelectControl,
    Dashicon,
    IconButton,
    PanelBody,
    PanelColor,
    RangeControl,
    Button,
    ButtonGroup,
} = wp.components;

const {
    InspectorControls,
    RichText,
    ColorPalette,
    URLInput,
} = wp.editor;

class ButtonSingleBlock extends Component {
    render() {
        const {
            attributes,
            setAttributes,
            isSelected,
        } = this.props;

        let { className = '' } = this.props;

        const {
            ghostkitClassname,
            variant,
            text,
            url,
            size,
            color,
            textColor,
            borderRadius,
            borderWeight,
            borderColor,
            hoverColor,
            hoverTextColor,
            hoverBorderColor,
        } = attributes;

        const availableVariants = GHOSTKIT.getVariants( 'button' );

        const sizes = {
            XS: 'xs',
            S: 'sm',
            M: 'md',
            L: 'lg',
            XL: 'xl',
        };

        className = classnames(
            'ghostkit-button',
            size ? `ghostkit-button-${ size }` : '',
            className
        );

        // variant classname.
        if ( 'default' !== variant ) {
            className = classnames( className, `ghostkit-button-variant-${ variant }` );
        }

        // add custom classname.
        if ( ghostkitClassname ) {
            className = classnames( className, ghostkitClassname );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody>
                        { Object.keys( availableVariants ).length > 1 ? (
                            <SelectControl
                                label={ __( 'Variants' ) }
                                value={ variant }
                                options={ Object.keys( availableVariants ).map( ( key ) => ( {
                                    value: key,
                                    label: availableVariants[ key ].title,
                                } ) ) }
                                onChange={ ( value ) => setAttributes( { variant: value } ) }
                            />
                        ) : '' }
                        <div className="blocks-size__main">
                            <ButtonGroup aria-label={ __( 'Size' ) }>
                                {
                                    Object.keys( sizes ).map( ( key ) =>
                                        <Button
                                            key={ key }
                                            isLarge
                                            isPrimary={ size === sizes[ key ] }
                                            aria-pressed={ size === sizes[ key ] }
                                            onClick={ () => setAttributes( { size: sizes[ key ] } ) }
                                        >
                                            { key }
                                        </Button>
                                    )
                                }
                            </ButtonGroup>
                            <Button
                                isLarge
                                onClick={ () => setAttributes( { size: 'md' } ) }
                            >
                                { __( 'Reset' ) }
                            </Button>
                        </div>
                        <RangeControl
                            label={ __( 'Corner Radius' ) }
                            value={ borderRadius }
                            min="0"
                            max="50"
                            onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
                        />
                        <PanelColor title={ __( 'Background Color' ) } colorValue={ color } >
                            <ColorPalette
                                value={ color }
                                onChange={ ( value ) => setAttributes( { color: value } ) }
                            />
                        </PanelColor>
                        <PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } >
                            <ColorPalette
                                value={ textColor }
                                onChange={ ( value ) => setAttributes( { textColor: value } ) }
                            />
                        </PanelColor>
                    </PanelBody>
                    <PanelBody title={ __( 'Border' ) } initialOpen={ false }>
                        <RangeControl
                            label={ __( 'Weight' ) }
                            value={ borderWeight }
                            min="0"
                            max="6"
                            onChange={ ( value ) => setAttributes( { borderWeight: value } ) }
                        />
                        <PanelColor title={ __( 'Color' ) } colorValue={ borderColor } >
                            <ColorPalette
                                value={ borderColor }
                                onChange={ ( value ) => setAttributes( { borderColor: value } ) }
                            />
                        </PanelColor>
                    </PanelBody>
                    <PanelBody title={ __( 'Hover Colors' ) } initialOpen={ false }>
                        <PanelColor title={ __( 'Background Color' ) } colorValue={ hoverColor } >
                            <ColorPalette
                                value={ hoverColor }
                                onChange={ ( value ) => setAttributes( { hoverColor: value } ) }
                            />
                        </PanelColor>
                        <PanelColor title={ __( 'Text Color' ) } colorValue={ hoverTextColor } >
                            <ColorPalette
                                value={ hoverTextColor }
                                onChange={ ( value ) => setAttributes( { hoverTextColor: value } ) }
                            />
                        </PanelColor>
                        <PanelColor title={ __( 'Border Color' ) } colorValue={ hoverBorderColor } >
                            <ColorPalette
                                value={ hoverBorderColor }
                                onChange={ ( value ) => setAttributes( { hoverBorderColor: value } ) }
                            />
                        </PanelColor>
                    </PanelBody>
                </InspectorControls>
                <div>
                    <RichText
                        tagName="span"
                        placeholder={ __( 'Add text…' ) }
                        value={ text }
                        onChange={ ( value ) => setAttributes( { text: value } ) }
                        formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
                        className={ className }
                        isSelected={ isSelected }
                        keepPlaceholderOnFocus
                    />
                </div>
                { isSelected ? (
                    <form
                        className="ghostkit-button__inline-link"
                        onSubmit={ ( event ) => event.preventDefault() }
                    >
                        <Dashicon icon="admin-links" />
                        <URLInput
                            value={ url }
                            onChange={ ( value ) => setAttributes( { url: value } ) }
                            autoFocus={ false }
                        />
                        <IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
                    </form>
                ) : '' }
            </Fragment>
        );
    }
}

export const name = 'ghostkit/button-single';

export const settings = {
    title: __( 'Button' ),
    parent: [ 'ghostkit/button' ],
    description: __( 'A single button within a buttons wrapper block.' ),
    icon: elementIcon,
    category: 'ghostkit',
    supports: {
        html: false,
        className: false,
        anchor: true,
        ghostkitStyles: true,
        ghostkitStylesCallback( attributes ) {
            return {
                backgroundColor: attributes.color,
                color: attributes.textColor,
                borderRadius: attributes.borderRadius,
                border: attributes.borderWeight && attributes.borderColor ? `${ attributes.borderWeight }px solid ${ attributes.borderColor }` : false,
                '&:hover, &:focus': {
                    backgroundColor: attributes.hoverColor,
                    color: attributes.hoverTextColor,
                    borderColor: attributes.borderWeight && attributes.borderColor && attributes.hoverBorderColor ? attributes.hoverBorderColor : false,
                },
            };
        },
        ghostkitSpacings: true,
        ghostkitDisplay: true,
        ghostkitSR: true,
    },
    attributes: {
        variant: {
            type: 'string',
            default: 'default',
        },
        url: {
            type: 'string',
            source: 'attribute',
            selector: 'a.ghostkit-button',
            attribute: 'href',
        },
        title: {
            type: 'string',
            source: 'attribute',
            selector: '.ghostkit-button',
            attribute: 'title',
        },
        text: {
            type: 'array',
            source: 'children',
            selector: '.ghostkit-button',
            default: 'Button',
        },
        size: {
            type: 'string',
            default: 'md',
        },
        color: {
            type: 'string',
            default: '#0366d6',
        },
        textColor: {
            type: 'string',
            default: '#ffffff',
        },
        borderRadius: {
            type: 'number',
            default: 2,
        },
        borderWeight: {
            type: 'number',
            default: 0,
        },
        borderColor: {
            type: 'string',
            default: '#00669b',
        },
        hoverColor: {
            type: 'string',
        },
        hoverTextColor: {
            type: 'string',
        },
        hoverBorderColor: {
            type: 'string',
        },
    },

    edit: ButtonSingleBlock,

    save: function( { attributes } ) {
        const {
            variant,
            text,
            url,
            title,
            size,
        } = attributes;

        let {
            className,
        } = attributes;

        className = classnames(
            'ghostkit-button',
            size ? `ghostkit-button-${ size }` : '',
            className
        );

        // variant classname.
        if ( 'default' !== variant ) {
            className = classnames( className, `ghostkit-button-variant-${ variant }` );
        }

        return url ? (
            <RichText.Content
                tagName="a"
                className={ className }
                href={ url }
                title={ title }
                value={ text }
            />
        ) : (
            <RichText.Content
                tagName="span"
                className={ className }
                title={ title }
                value={ text }
            />
        );
    },
};
