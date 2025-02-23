import { fireEvent, render } from '@testing-library/vue';
import { IRadio } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IRadio', () => {
        const props = {
            name: 'radio',
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IRadio.name).toEqual('IRadio');
        });

        it('should render correctly', () => {
            const wrapper = render(IRadio, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(IRadio, {
                        props: {
                            color: props.color,
                            size: props.size
                        }
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    expect(inputElement).toHaveAttribute('name', expect.stringContaining('radio'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IRadio, {
                        props: {
                            disabled: true,
                            readonly: true,
                            native: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-disabled',
                        '-readonly',
                        '-native'
                    );
                });
            });

            describe('checked', () => {
                it('should be checked is formGroup.checked is equal to value if formGroup', () => {
                    const value = 'value';
                    const wrapper = render(IRadio, {
                        global: {
                            provide: {
                                formGroup: {
                                    checked: value
                                }
                            }
                        },
                        props: {
                            value,
                            ...props
                        }
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    expect(inputElement).toBeChecked();
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(IRadio, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    expect(labelElement).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(IRadio, { props });
                    const labelElement = wrapper.container.querySelector('label');

                    expect(labelElement).toHaveAttribute('tabindex', '0');
                });
            });
        });

        describe('methods', () => {
            describe('clickInputRef()', () => {
                it('should not be able to click label if disabled', () => {
                    const wrapper = render(IRadio, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.click(labelElement as Element);
                    expect(inputElement).not.toBeChecked();
                });

                it('should not be able to click label if readonly', () => {
                    const wrapper = render(IRadio, {
                        props: {
                            readonly: true,
                            ...props
                        }
                    });
                    const labelElement = wrapper.container.querySelector('label');
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.click(labelElement as Element);
                    expect(inputElement).not.toBeChecked();
                });

                it('should change input value on click when clicking label', () => {
                    const wrapper = render(IRadio, { props });
                    const labelElement = wrapper.container.querySelector('label');
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.click(labelElement as Element);
                    expect(inputElement).toBeChecked();
                });
            });

            describe('onChange()', () => {
                it('should call parent onInput', () => {
                    const onInput = jest.fn();
                    const wrapper = render(IRadio, {
                        global: {
                            provide: {
                                form: {
                                    onInput
                                }
                            }
                        },
                        props
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.change(inputElement as Element);
                    expect(onInput).toHaveBeenCalled();
                });

                it('should call parent onChange if formGroup', () => {
                    const onChange = jest.fn();
                    const wrapper = render(IRadio, {
                        global: {
                            provide: {
                                formGroup: {
                                    onChange
                                }
                            }
                        },
                        props
                    });
                    const inputElement = wrapper.container.querySelector('input');

                    fireEvent.change(inputElement as Element);
                    expect(onChange).toHaveBeenCalled();
                });
            });

            describe('onBlur()', () => {
                it('should call parent onBlur if defined', () => {
                    const onBlur = jest.fn();
                    const wrapper = render(IRadio, {
                        global: {
                            provide: {
                                form: {
                                    onBlur
                                }
                            }
                        },
                        props
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    fireEvent.blur(labelElement as Element);
                    expect(onBlur).toHaveBeenCalled();
                });

                it('should not call parent onBlur if not defined', () => {
                    const onBlur = jest.fn();
                    const wrapper = render(IRadio, {
                        global: {
                            provide: {
                                form: {}
                            }
                        },
                        props
                    });
                    const labelElement = wrapper.container.querySelector('label');

                    fireEvent.blur(labelElement as Element);
                    expect(onBlur).not.toHaveBeenCalled();
                });
            });
        });
    });
});
