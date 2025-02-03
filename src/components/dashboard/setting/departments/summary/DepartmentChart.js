'use client';

import PropTypes from 'prop-types';
import {Fragment} from 'react';
import dynamic from 'next/dynamic';

// material-ui
import {useTheme} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import {ThemeMode} from 'config';

const Tree = dynamic(() => import('react-organizational-chart').then((mod) => mod.Tree), {
    ssr: false
});

const TreeNode = dynamic(() => import('react-organizational-chart').then((mod) => mod.TreeNode), {
    ssr: false
});


const data = [
    {
        name: 'Pulak Mustafa',
        role: 'CTO',
        children: [
            {
                name: 'Terence Kaite',
                role: 'Principal Software Engineer'
            },
            {
                name: 'Gift Mungule',
                role: 'Snr Software Engineer'
            },
            {
                name: 'Yengwe Tepalu',
                role: 'Software Engineer',
            },
            {
                name: 'Mukuka Tumiya Emmanuel Jr.',
                role: 'Software Engineer',
            }
        ]
    }
];

function SimpleTree({name}) {
    const theme = useTheme();

    return (
        <Typography
            sx={{
                p: 2,
                border: `1px solid ${theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary.main : theme.palette.primary.main}`,
                width: 'max-content',
                m: 'auto',
                color: theme.palette.mode === ThemeMode.DARK ? `text.secondary` : `secondary.dark`,
                bgcolor: theme.palette.mode === ThemeMode.DARK ? `background.default` : `secondary.light`,
                borderRadius: 1
            }}
        >
            {name}
        </Typography>
    );
}

SimpleTree.propTypes = {
    name: PropTypes.string
};

function TreeCard({items}) {
    return (
        <>
            {items.map((item, id) => (
                <Fragment key={id}>
                    {item.children ? (
                        <TreeNode label={<SimpleTree name={item.name}/>}>
                            <TreeCard items={item.children}/>
                        </TreeNode>
                    ) : (
                        <TreeNode label={<SimpleTree name={item.name}/>}/>
                    )}
                </Fragment>
            ))}
        </>
    );
}

TreeCard.propTypes = {
    items: PropTypes.array
};

const DepartmentChart = () => {
    const theme = useTheme();

    return (
        <Grid container rowSpacing={2} justifyContent="center">
            <Grid item md={12} lg={12} xs={12}>
                <Grid container spacing={2}>
                    <Grid item md={12} lg={12} xs={12}>
                        <Tree
                            lineWidth="1px"
                            lineColor={theme.palette.secondary.main}
                            lineBorderRadius="10px"
                            label={<SimpleTree name={data[0].name}/>}
                        >
                            <TreeCard items={data[0].children}/>
                        </Tree>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DepartmentChart;
