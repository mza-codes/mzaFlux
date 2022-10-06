import { Grid, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";

export default function WishList() {

    return (
        <>
            <Container className='white'>
                <Grid item container justifyContent='center'>
                    <Stack textAlign='center' direction='column' >
                        <Typography variant="h4" gutterBottom> Your  Wishlist</Typography>
                    </Stack>
                    <Grid item container xs={12} md={6}>
                        <Stack></Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}