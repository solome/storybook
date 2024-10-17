import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FileTree } from '.';

const meta: Meta<typeof FileTree> = {
  title: 'Components/FileTree',
  component: FileTree,
};

export default meta;

type Story = StoryObj<typeof FileTree>;

export const Demo1: Story = {
  args: {
    data: [{
      fileName: 'components',
      
      children: [
        {
          fileName: 'FileTree',
          children: [
            {
              fileName: 'FileTree.stories.tsx',
            }
          ]
        },
        {
          fileName: 'data',
          children: [
            {
              fileName: 'test.ts',
            },
          ],
        },
        {
          fileName: 'helpers',
          children: [
            {
              fileName: 'Icons.ts',
            },
            {
              fileName: 'file-tree-icons.ts',
              configure: {
                highlight: true
              }
            },
            {
              fileName: 'index.ts',
            },
            {
              fileName: 'typings.ts',
            },
          ],
        },
        {
          fileName: 'index.ts',
        },
        {
          fileName: 'juyipeng-file-tree.ts',
        },
      ],
    }],
  },
};


export const Demo2: Story = {
  args: {
    data: [
      {
        fileName: 'astro.config.mjs',
      },
      {
        fileName: 'package.json',
      },
      {
        fileName: 'src',
        children: [
          {
            fileName: 'components',
            children: [
              {
                fileName: 'Header.astro',
              },
              {
                fileName: 'Title.astro',
              }
            ]
          },
          {
            fileName: 'pages/'
          }
        ]
      }
    ]
  }
}
