import './style.scss';
import { computed, defineComponent, h } from '@inkline/paper';
import {
    defaultPropValue
} from '@inkline/inkline/mixins';
import { useColorVariant } from '@inkline/inkline/composables';

/**
 * Slot for default breadcrumb content
 * @name default
 * @kind slot
 */

const componentName = 'IBreadcrumb';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The aria-label of the breadcrumbs
         * @type String
         * @default Breadcrumbs
         * @name ariaLabel
         */
        ariaLabel: {
            type: String,
            default: 'Breadcrumbs'
        },
        /**
         * The color variant of the breadcrumb
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The size variant of the breadcrumb
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size')
        }
    },
    setup (props) {
        const { color } = useColorVariant(props.color);

        console.log(color.value);

        const classes = computed(() => `${
            props.className ? ` ${props.className}` : ''
        }${
            color.value ? ` -${color.value}` : ''
        }${
            props.size ? ` -${props.size}` : ''
        }`, [color.value, props.size, props.className]);

        return {
            classes
        };
    },
    render ({ classes, ariaLabel }, { slot }) {
        return <nav
            class={`breadcrumb${classes.value}`}
            aria-label={ariaLabel}
        >
            <ol>
                { slot() }
            </ol>
        </nav>;
    }
});
