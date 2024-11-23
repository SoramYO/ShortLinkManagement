import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    components: {
        // Name of the component
        MuiTypography: {
            styleOverrides: {
            // Name of the slot
                root: {
                    // Some CSS
                    '&.MuiTypography-body1': {fontSize: '0.875rem'}
                }
            }
        }
    }
});
export default theme;