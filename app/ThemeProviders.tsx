'use client';

import { ThemeProvider, extendTheme,  } from "@mui/joy";

const foregroundColorValue = '#000000';
const primaryColorValue = '#5680E9';
const secondaryColorValue = '#8860D0';
const backgroundColorValue = '#C1C8E4';
const gradientStartColorValue = '#59EBCB';
const gradientEndColorValue = '#84CEEB';

/* 
    --foreground-color: #000000;
    --primary-color: #5680E9;
    --secondary-color: #59EBCB;
    --background-color: #C1C8E4;
    --gradient-start-color: #8860D0;
    --gradient-end-color: #84CEEB;
*/

export default function ThemeProviders({ children }: { children: React.ReactNode }) {
    const theme = extendTheme({
        components: {
            JoyCircularProgress: {
                styleOverrides: {
                    progress: {
                        stroke: `${primaryColorValue} !important`
                    }
                },
            },
            JoyButton: {
                styleOverrides: {
                    root: {
                        backgroundImage: `linear-gradient(to top, ${primaryColorValue}, ${secondaryColorValue}) !important`,
                        backgroundSize: 'auto 300% !important',
                        backgroundPositionY: '100% !important',
                        padding: '12px 0px',
                        width: '100%',
                        textTransform: 'none',
                        transition: 'all 750ms ease !important',
                        '&:hover': {
                            backgroundPositionY: '0% !important',
                            scale: '0.985',
                        },
                    },
                },
            },
            JoyInput: {
                styleOverrides: {
                    input: {
                        '&:focus-visible': {
                            outline: 'none'
                        }
                    },
                }
            }
        },
        colorSchemes: {
            dark: {
                palette: {
                    primary: {
                        400: primaryColorValue,
                    },
                    neutral: {
                        "400": secondaryColorValue,
                    },
                    background: {
                        body: backgroundColorValue,
                    },
                },
            }, light: {
                palette: {
                    primary: {
                        400: primaryColorValue,
                    },
                    neutral: {
                        "400": secondaryColorValue,
                    },
                    background: {
                        body: backgroundColorValue,
                    },
                },
            }
        }
    })
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}