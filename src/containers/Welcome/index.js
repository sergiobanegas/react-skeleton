import React from 'react';

import SignInContainer from './SignIn';
import SignUpContainer from './SignUp';
import Container from '../../components/Container';
import Grid, {GridColumn} from '../../components/Grid';

export default () => (
    <div>
        <SignInContainer/>
        <Grid centered>
            <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                <Container>
                    <SignUpContainer/>
                </Container>
            </GridColumn>
        </Grid>
    </div>
);
