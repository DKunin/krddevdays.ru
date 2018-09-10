import React, {Component, Fragment} from 'react'
import Helmet from 'react-helmet'
import Image from 'gatsby-image'
import {ThemeProvider} from 'styled-components'
import {graphql} from 'gatsby'
import firstmkLogo from './firstmk-logo.svg'
import avitoLogo from './avito-logo.svg'
import waliotLogo from './waliot-logo.svg'
import arkadiumLogo from './arkadium-logo.svg'
import jetbrainsLogo from './jetbrains-logo.svg'

import Layout from '../components/Layout'
import Flex from '../components/Flex'
import Details from '../components/Details'
import Box from '../components/Box'
import Container from '../components/Container'
import Heading from '../components/Heading'
import BorderedBox from '../components/BorderedBox'
import Text from '../components/Text'
import styled from 'styled-components'
import tag from 'clean-tag'
import Button from '../components/Button'
import Avatar from '../components/Avatar'
import ImageLink from '../components/ImageLink'

import {FirestoreProvider, FirestoreCollection} from 'react-firestore'
import {firebase} from '../firebase'
import PropTypes from 'prop-types'

const Shadow = styled(tag)`
  position: relative;
  min-height: ${props =>
    214 +
    (parseInt(props.top) < 0 ? parseInt(props.top) : 0) +
    (!props.top && parseInt(props.bottom) < 0 ? parseInt(props.bottom) : 0)}px;
  ${props =>
    props.top &&
    parseInt(props.top) < 0 &&
    `
    margin-top: ${-parseInt(props.top)}px;
  `}
  ${props =>
    !props.top &&
    props.bottom &&
    parseInt(props.bottom) < 0 &&
    `
    margin-bottom: ${-parseInt(props.bottom)}px;
  `}
  
  &:before {
    ${props => props.top && `top: ${props.top};`}
    ${props => props.right && `right: ${props.right};`}
    ${props => props.bottom && `bottom: ${props.bottom};`}
    ${props => props.left && `left: ${props.left};`}
    content: '';
    display: block;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='415' height='214'%3E%3Cpath fill='${props =>
      encodeURIComponent(
        props.color
      )}' fill-rule='nonzero' d='M5.6 11.21l5.6-5.6L5.6 0 0 5.6l5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zM28.02 11.21l5.6-5.6L28.02 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zM50.43 11.21l5.6-5.6L50.44 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zM72.85 11.21l5.6-5.6L72.85 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zM95.26 11.21l5.6-5.6L95.27 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.42-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.41-201.79l5.6-5.6L140.1 0l-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.42-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.41-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.42-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.43l5.6-5.61-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22.42l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22.41-201.79l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm23-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm23-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.6-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm22-201l5.61-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.61-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm23-201l5.61-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.61-5.6-5.6-5.61-5.6 5.6 5.6 5.61zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 23l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6zm0 22l5.61-5.6-5.6-5.6-5.6 5.6 5.6 5.6z' opacity='.4'/%3E%3C/svg%3E") no-repeat;
    position: absolute;
    width: 415px;
    height: 214px;
    z-index: -1;
  }
`

Shadow.defaultProps = {
  color: '#B07EC5',
}

const List = styled(Flex)`
  &:after {
    content: '';
    flex: auto;
  }
`

const SafeAreaBox = styled(Box)`
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`

const topics = [
  {
    lecturer: {
      name: 'Юлия Федоренко',
      gender: 'female',
    },
    type: 'design',
    title: 'Фронтендеры с Сатурна — дизайнеры с Плутона',
    link: 'https://vk.com/wall-131416798_358',
  },
  {
    lecturer: {
      name: 'Айрат Худайгулов',
      company: 'Arkadium',
      gender: 'male',
    },
    type: 'development',
    title: 'История функционального программирования и щепотка монад',
    link: 'https://vk.com/wall-131416798_371',
  },
  {
    lecturer: {
      name: 'Никита Соболев',
      company: 'wemake.services',
      gender: 'male',
    },
    type: 'development',
    title: 'Тестируем настоящее Vue приложение',
    link: 'https://vk.com/wall-131416798_380',
  },
  {
    lecturer: {
      name: 'Данил Герун',
      company: 'Современные решения',
      gender: 'male',
    },
    type: 'development',
    title: (
      <Fragment>
        Мониторинг:<br />IT-инфраструктура на кончиках пальцев
      </Fragment>
    ),
    link: 'https://vk.com/wall-131416798_385',
  },
  {
    lecturer: {
      name: 'Сэм Булатов',
      gender: 'male',
    },
    type: 'development',
    title: '7 будущих чудес CSS',
    link: 'https://vk.com/wall-131416798_372',
  },
  {
    lecturer: {
      name: 'Игорь Косенков',
      company: 'Postgres Professional',
      gender: 'male',
    },
    type: 'development',
    title: (
      <Fragment>
        Отказоустойчивые решения&nbsp;PostgreSQL с автоматическим failover'ом
      </Fragment>
    ),
    link: 'https://vk.com/wall-131416798_376',
  },
  {
    lecturer: {
      name: 'Всеволод Шмыров',
      company: 'Яндекс',
      gender: 'male',
    },
    type: 'development',
    title: 'API: Хороший, плохой, злой',
    link: 'https://vk.com/wall-131416798_395',
  },
  {
    lecturer: {
      name: 'Денис Сальников',
      company: 'N26',
      gender: 'male',
    },
    type: 'management',
    title: 'Объясняем Scrum: История эволюции одной команды',
    link: 'https://vk.com/wall-131416798_365',
  },
  {
    lecturer: {
      name: 'Дмитрий Кунин',
      company: 'Avito',
      gender: 'male',
    },
    type: 'development',
    title: 'Dat протокол — общие понятия, инструменты, применение',
    link: 'https://vk.com/wall-131416798_357',
  },
  {
    lecturer: {
      name: 'Алина Савченко',
      gender: 'female',
    },
    type: 'qa',
    title: 'Суровая жизнь тестировщика игр',
    link: 'https://vk.com/wall-131416798_360',
  },
  {
    lecturer: {
      name: 'Станислав Ткаченко',
      company: 'Arkadium',
      gender: 'male',
    },
    type: 'development',
    title: 'Архитектор (скрипач) не нужен',
    link: 'https://vk.com/wall-131416798_362',
  },
  {
    lecturer: {
      name: 'Алексей Наумов',
      gender: 'male',
    },
    type: 'management',
    title: 'Мы рождены, чтоб сказку сделать в коде?',
    link: 'https://vk.com/wall-131416798_387',
  },
  {
    lecturer: {
      name: 'Евгений Воронин',
      company: 'Chava Inc.',
      gender: 'male',
    },
    type: 'development',
    title: 'Гибридное мобильное приложение своими руками',
    link: 'https://vk.com/wall-131416798_393',
  },
  {
    lecturer: {
      name: 'Андрей Холявкин',
      company: 'Аркадия',
      gender: 'male',
    },
    type: 'management',
    title: 'Эмоциональный интеллект',
    link: 'https://vk.com/wall-131416798_397',
  },
]

const imageByTypeAndGender = {
  design: {
    male: 'designMaleImage',
    female: 'designFemaleImage',
  },
  qa: {
    male: 'QAMaleImage',
    female: 'QAFemaleImage',
  },
  management: {
    male: 'managementMaleImage',
    female: 'managementFemaleImage',
  },
  development: {
    male: 'developmentMaleImage',
    female: 'developmentFemaleImage',
  },
}

const titleByType = {
  design: 'Дизайн',
  qa: 'Тестирование',
  management: 'Менеджмент',
  development: 'Разработка',
}

function plural(number, strings) {
  number %= 100

  if (number > 10 && number < 20) {
    return strings[2]
  }

  number %= 10

  return strings[number > 1 && number < 5 ? 1 : number === 1 ? 0 : 2]
}

let archives = {}

function flatten(newArray, singleValue) {
  return newArray.concat(singleValue)
}

function saveLink(link) {
  fetch('http://192.241.145.243:3002/newlink', {
      method: 'POST',
     
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ link })
    });
}

class IndexPage extends Component {
  static propTypes = {
    data: PropTypes.any,
  }

  input = React.createRef()

  constructor(props) {
    super(props)
    this.state = {
      likes: [],
      comments: [],
      subscriptions: [],
      mainArchive: {},
      mainDatUrl: null,
      name: null,
    }
  }

  async updateDatInfo() {
    const allArchives = Array.from(
      new Set(
        this.state.subscriptions.concat(
          this.state.mainDatUrl.replace('dat://', '')
        )
      )
    ).map(singleArchiveUrl => {
      return archives[singleArchiveUrl]
        ? archives[singleArchiveUrl]
        : new DatArchive(singleArchiveUrl) // eslint-disable-line no-undef
    })

    const comments = await Promise.all(
      allArchives.map(this.getComments)
    ).then(allComms => {
      return allComms.reduce(flatten, [])
    })
    this.setState({comments})

    const likes = await Promise.all(
      allArchives.map(this.getLikes)
    ).then(allComms => {
      return allComms.reduce(flatten, [])
    })
    this.setState({likes})
  }

  async getComments(singleArchive) {
    return new Promise(async function(resolve) {
      const files = await singleArchive.readdir('/comments')
      let commentsArray = files.map(async function(singleNoteName) {
        const fileName = `/comments/${singleNoteName}`
        const note = await singleArchive.readFile(fileName)
        const theNote = JSON.parse(note)
        theNote.fileName = fileName
        return theNote
      })
      Promise.all(commentsArray).then(resolve)
    })
  }

  async getLikes(singleArchive) {
    return new Promise(async function(resolve) {
      const files = await singleArchive.readdir('/likes')
      let likesArray = files.map(async function(singleNoteName) {
        const note = await singleArchive.readFile(`/likes/${singleNoteName}`)
        return JSON.parse(note)
      })
      Promise.all(likesArray).then(resolve)
    })
  }

  updateInfoState(archive) {
    archive.readdir('/comments').then(commentsList => {
      let commentsArray = commentsList.map(async function(singleNoteName) {
        const note = await archive.readFile(`/comments/${singleNoteName}`)
        return JSON.parse(note)
      })

      Promise.all(commentsArray).then(comments => {
        this.setState({comments})
      })
    })

    archive.readdir('/likes').then(likesList => {
      let likesArray = likesList.map(async function(singleNoteName) {
        const note = await archive.readFile(`/likes/${singleNoteName}`)
        return JSON.parse(note)
      })

      Promise.all(likesArray).then(likes => {
        this.setState({likes})
      })
    })
  }

  async componentDidMount() {
    const mainUrl = localStorage.getItem('mainUrl')
    const allData = new DatArchive('dat://e10d47364886a31e8bfc31379f036dca4e0fc3d0d2fd8362ecb0bb9beb747743') // eslint-disable-line no-undef
    let links = JSON.parse(await allData.readFile('/data.json'))

    if (mainUrl) {
      this.setMainDatUrl(mainUrl)
    }

    this.setState({subscriptions: links})
  }

  async setMainDatUrl(datUrl) {
    const archive = new DatArchive(datUrl) // eslint-disable-line no-undef
    const info = await archive.getInfo()
    let config = {
      blocked: [],
    }
    try {
      config = JSON.parse(await archive.readFile('/config.json'))
    } catch (err) {}

    if (config.blocked.length) {
      this.setState({
        subscriptions: this.state.subscriptions.filter(singleSub => {
          return !config.blocked.includes(singleSub)
        }),
      })
    }

    this.setState({
      mainArchive: archive,
      mainDatUrl: archive.url,
      name: info.description,
    })
    setTimeout(() => {
      this.updateDatInfo()
    }, 100)
  }

  getParticularComments(lecturer) {
    const lecturersComments = this.state.comments.filter(singleComment => {
      return singleComment.origin === lecturer.name
    })

    return lecturersComments.length
  }

  async handleRemoveComment({author, text, time, authorDat, fileName}, event) {
    event.preventDefault()
    if (authorDat === this.state.mainDatUrl) {
      const approveOfBlock = window.confirm(
        'Вы уверены, что хотите удалить комментарий?'
      )
      if (approveOfBlock) {
        const archive = this.state.mainArchive
        await archive.unlink(fileName)
      }
    } else {
      const approveOfBlock = window.confirm(
        'Вы уверены, что хотите заблокировать автора?'
      )
      if (approveOfBlock) {
        const archive = this.state.mainArchive
        let config = {
          blocked: [],
        }
        try {
          config = JSON.parse(await archive.readFile('/config.json'))
        } catch (err) {}
        config.blocked = Array.from(new Set(config.blocked.concat([ authorDat.replace('dat://', '') ])));
        await archive.writeFile('/config.json', JSON.stringify(config));
        window.location.reload()
      }
    }
    setTimeout(() => {
      this.updateDatInfo()
    }, 100)
  }

  renderLecturerComments(lecturer) {
    const lecturersComments = this.state.comments.filter(singleComment => {
      return singleComment.origin === lecturer.name
    })
    return (
      <div>
        {lecturersComments.map(
          ({author, text, time, authorDat, fileName}, index) => {
            return (
              <li key={time + index}>
                <strong>
                  <a className="author-link" href={authorDat}>
                    {author}
                  </a>{' '}
                  <a
                    className="remove-comment"
                    onClick={this.handleRemoveComment.bind(this, {
                      author,
                      text,
                      time,
                      authorDat,
                      fileName,
                    })}
                  >
                    {' '}
                    ␡
                  </a>
                </strong>
                {text}
                <small>{time}</small>
              </li>
            )
          }
        )}
      </div>
    )
  }

  async handleAddComment(lecturer, event) {
    event.preventDefault()
    const text = prompt('Введите Ваш комментарий', 'Отличный доклад')
    if (!text) {
      return
    }
    await this.state.mainArchive.writeFile(
      `/comments/comment-${new Date().getTime()}`,
      JSON.stringify({
        origin: lecturer.name,
        text,
        author: this.state.name,
        authorDat: this.state.mainDatUrl,
        time: new Date().toLocaleString(),
      })
    )
    this.updateDatInfo()
  }

  getParticularLikes(lecturer) {
    const lecturersLikes = this.state.likes.filter(singleComment => {
      return singleComment.origin === lecturer.name
    })

    return lecturersLikes.length
  }

  listLecturerLikes(lecturer) {
    const lecturersLikes = this.state.likes.filter(singleComment => {
      return singleComment.origin === lecturer.name
    })

    return lecturersLikes
      .map(singleLike => {
        return singleLike.author
      })
      .join('\n')
  }

  async handleAddLike(lecturer, event) {
    event.preventDefault()
    const fileName = `/likes/like-${btoa(encodeURIComponent(lecturer.name))}`
    let fileStat
    try {
      fileStat = await this.state.mainArchive.stat(fileName)
    } catch (err) {}
    if (fileStat) {
      await this.state.mainArchive.unlink(fileName)
    } else {
      await this.state.mainArchive.writeFile(
        fileName,
        JSON.stringify({
          origin: lecturer.name,
          author: this.state.name,
        })
      )
    }
    this.updateDatInfo()
  }

  async handleRegister(event) {
    event.preventDefault()
    const archive = await DatArchive.create({ // eslint-disable-line no-undef
      title: 'KrvDevDays Comments And Likes',
      description: 'Введите Ваше имя',
      prompt: true,
    })
    await archive.mkdir('/comments')
    await archive.mkdir('/likes')
    const info = await archive.getInfo()
    this.setState({
      mainArchive: archive,
      mainDatUrl: archive.url,
      name: info.description,
    });
    console.log(archive.url);
    saveLink(archive.url)
  }

  async handleAuth(event) {
    event.preventDefault()
    const archive = await DatArchive.selectArchive({// eslint-disable-line no-undef
      title: 'Выберите свой профиль',
      buttonLabel: 'Выбрать',
      filters: {
        isOwner: true,
      },
    })

    const info = await archive.getInfo()
    this.setState({
      mainArchive: archive,
      mainDatUrl: archive.url,
      name: info.description,
    })
    setTimeout(() => {
      this.updateDatInfo()
    }, 400)

    localStorage.setItem('mainUrl', archive.url)
  }

  render() {
    let {data} = this.props
    return (
      <ThemeProvider
        theme={{
          breakpoints: [
            '375px',
            '438px',
            '568px',
            '639px',
            '768px',
            '1024px',
            '1170px',
          ],
        }}
      >
        <Layout>
          <Helmet>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
            />
          </Helmet>
          <SafeAreaBox
            position="relative"
            minHeight={`${data.backgroundFirst.childImageSharp.fixed.height}px`}
          >
            <Image
              fixed={data.backgroundFirst.childImageSharp.fixed}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'white',
              }}
            />
            <Container is="section">
              <Flex
                justifyContent={[
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'space-between',
                ]}
                flexDirection={[
                  'column',
                  'column',
                  'column',
                  'column',
                  'column',
                  'column',
                  'row',
                ]}
                pt={['0px', '0px', '0px', '0px', '0px', '0px', '120px']}
                alignItems={[
                  'stretch',
                  'stretch',
                  'stretch',
                  'stretch',
                  'stretch',
                  'stretch',
                  'flex-start',
                ]}
              >
                <Box
                  mt={['40px', '40px', '40px', '40px', '40px', '40px', '0px']}
                >
                  <Shadow top="-40px" left="-200px">
                    <Heading
                      is="h1"
                      maxWidth={['none', 'none', 'none', 'none', '620px']}
                      fontSize={['27px', '33px', '39px', '48px']}
                      lineHeight={['40px', '48px', '57px', '70px']}
                      letterSpacing="0.125em"
                      fontWeight="900"
                    >
                      Ежегодная конференция разработчиков Краснодара и края
                    </Heading>
                  </Shadow>
                </Box>
                <Flex
                  flexDirection="column"
                  alignItems={[
                    'stretch',
                    'stretch',
                    'stretch',
                    'stretch',
                    'stretch',
                    'stretch',
                    'flex-end',
                  ]}
                >
                  <BorderedBox
                    flex={[
                      '0 1 auto',
                      '0 1 auto',
                      '0 1 auto',
                      '0 1 auto',
                      '0 1 auto',
                      '0 1 auto',
                      '0 0 auto',
                    ]}
                    p="20px"
                    boxShadow="-10px 10px 0 #B07EC5"
                    mt={['40px', '40px', '40px', '40px', '40px', '40px', '0px']}
                    itemScope
                    itemType="http://schema.org/Event"
                  >
                    <Text
                      fontSize={['28px', '34px']}
                      letterSpacing="0.125em"
                      lineHeight={['36px', '44px']}
                      fontWeight="900"
                      maxWidth={[
                        'none',
                        'none',
                        'none',
                        'none',
                        'none',
                        'none',
                        '280px',
                      ]}
                      itemProp="name"
                    >
                      Krasnodar Dev Days #3
                    </Text>
                    <Text
                      fontSize={['28px', '34px']}
                      letterSpacing="0.125em"
                      lineHeight={['36px', '44px']}
                      fontWeight="900"
                      maxWidth={[
                        'none',
                        'none',
                        'none',
                        'none',
                        'none',
                        'none',
                        '280px',
                      ]}
                      itemProp="name"
                    >
                      <a
                        style={{color: 'black', textDecoration: 'none'}}
                        hidden={!this.state.name}
                        href={this.state.mainDatUrl}
                        title={this.state.mainDatUrl}
                      >
                        Участник: {this.state.name}
                      </a>
                    </Text>
                    <meta
                      itemProp="description"
                      content="Ежегодная конференция разработчиков Краснодара и края"
                    />
                    <div
                      itemProp="offers"
                      itemScope
                      itemType="http://schema.org/AggregateOffer"
                    >
                      <meta itemProp="lowPrice" content="1500" />
                      <meta itemProp="highPrice" content="2500" />
                      <meta itemProp="priceCurrency" content="RUB" />
                    </div>
                    {[
                      {
                        content: '15 сентября, 10:00',
                        props: {
                          itemProp: 'startDate',
                          content: '2018-09-15T10:00:00+03:00',
                        },
                      },
                      {
                        content: (
                          <Fragment>
                            <meta
                              itemProp="name"
                              content="Бизнес-центр Меркурий"
                            />
                            <span
                              itemProp="address"
                              itemScope
                              itemType="http://schema.org/PostalAddress"
                            >
                              <span itemProp="streetAddress">
                                ул. Трамвайная 2/6
                              </span>
                              <meta
                                itemProp="addressLocality"
                                content="Краснодар"
                              />
                              <meta
                                itemProp="addressRegion"
                                content="Краснодарский край"
                              />
                            </span>
                          </Fragment>
                        ),
                        props: {
                          itemProp: 'location',
                          itemScope: true,
                          itemType: 'http://schema.org/Place',
                        },
                      },
                    ].map(({content, props}, key) => (
                      <Flex alignItems="center" mt="20px" key={key}>
                        <Box
                          display={['none', 'none', 'none', 'block']}
                          mr="30px"
                          bg="#252525"
                          height="3px"
                          flex="0 0 60px"
                          width="60px"
                        />
                        <Text
                          fontSize={['24px']}
                          lineHeight={['29px']}
                          fontWeight="900"
                          {...props}
                        >
                          {content}
                        </Text>
                      </Flex>
                    ))}
                  </BorderedBox>
                  <Flex>
                    <Button
                      display={[
                        'none',
                        'none',
                        'none',
                        'none',
                        'none',
                        'none',
                        this.state.mainDatUrl ? 'none' : 'block',
                      ]}
                      onClick={this.handleRegister.bind(this)}
                      target="_blank"
                      mt="80px"
                    >
                      Зарегистрироваться
                    </Button>
                    <Button
                      display={[
                        'none',
                        'none',
                        'none',
                        'none',
                        'none',
                        'none',
                        'block',
                      ]}
                      onClick={this.handleAuth.bind(this)}
                      target="_blank"
                      mt="80px"
                      ml="20px"
                    >
                      {this.state.mainDatUrl ? 'Сменить пользователя' :'Авторизоваться'}
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <BorderedBox p="10px 20px" mt="40px">
                <Flex
                  justifyContent={[
                    'flex-start',
                    'flex-start',
                    'flex-start',
                    'flex-start',
                    'flex-start',
                    'space-between',
                  ]}
                  flexWrap="wrap"
                >
                  {[
                    {
                      title: '2 потока',
                      description: '// каждый найдет доклад по интересам',
                    },
                    {
                      title: 'круглый стол',
                      description: '// открытые дискуссии на любые темы',
                    },
                    {
                      title: '350 участников',
                      description:
                        '// прекрасная возможность найти единомышленников',
                    },
                  ].map(({title, description}, key) => (
                    <Flex
                      flexDirection="column"
                      width={[
                        'auto',
                        'auto',
                        'auto',
                        'auto',
                        'auto',
                        '49%',
                        '33%',
                      ]}
                      key={key}
                      my="10px"
                    >
                      <Flex alignItems="center">
                        <Box
                          display={['none', 'none', 'none', 'block']}
                          mr="30px"
                          bg="#252525"
                          height="3px"
                          flex="0 0 60px"
                          width="60px"
                        />
                        <Text
                          fontSize={['24px']}
                          lineHeight={['29px']}
                          fontWeight="900"
                        >
                          {title}
                        </Text>
                      </Flex>
                      <Text
                        fontSize="16px"
                        lineHeight="22px"
                        fontWeight="500"
                        mt="20px"
                      >
                        {description}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </BorderedBox>
              <Flex>
                <Button
                  display={[
                    this.state.mainDatUrl ? 'none' : 'inline-block',
                    this.state.mainDatUrl ? 'none' : 'inline-block',
                    this.state.mainDatUrl ? 'none' : 'inline-block',
                    this.state.mainDatUrl ? 'none' : 'inline-block',
                    this.state.mainDatUrl ? 'none' : 'inline-block',
                    this.state.mainDatUrl ? 'none' : 'inline-block',
                    'none'
                  ]}
                  onClick={this.handleRegister.bind(this)}
                  target="_blank"
                  mt="40px"
                >
                  Зарегистрироваться
                </Button>
                <Button
                  display={[
                    'inline-block',
                    'inline-block',
                    'inline-block',
                    'inline-block',
                    'inline-block',
                    'inline-block',
                    'none',
                  ]}
                  onClick={this.handleAuth.bind(this)}
                  target="_blank"
                  mt="40px"
                  ml={this.state.mainDatUrl ? '0px' : '40px'}
                >
                  {this.state.mainDatUrl ? 'Сменить пользователя' :'Авторизоваться'}
                </Button>
              </Flex>
            </Container>
            <Container is="section" id="topics">
              <Flex
                justifyContent={[
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'space-between',
                ]}
                flexDirection={[
                  'column',
                  'column',
                  'column',
                  'column',
                  'column',
                  'row',
                ]}
                mt={['80px']}
                alignItems={[
                  'stretch',
                  'stretch',
                  'stretch',
                  'stretch',
                  'stretch',
                  'flex-start',
                ]}
              >
                <Box>
                  <Shadow top="-40px" left="-200px">
                    <Heading
                      is="h2"
                      fontSize={['27px', '33px', '39px', '48px']}
                      lineHeight={['40px', '48px', '57px', '70px']}
                      letterSpacing="0.125em"
                      fontWeight="900"
                      mb="40px"
                    >
                      Доклады
                    </Heading>
                  </Shadow>
                </Box>
                <Button
                  is='a'
                  href='https://krddevdays.ru/schedule.pdf'
                  target='_blank'
                  mt={['20px', '20px', '20px', '20px', '20px', '40px']}
                >
                  Расписание
                </Button>
              </Flex>
              <List
                justifyContent={[
                  'stretch',
                  'stretch',
                  'stretch',
                  'stretch',
                  'stretch',
                  'space-between',
                ]}
                flexWrap="wrap"
                mt="40px"
                mx="-10px"
              >
                {topics.map(({title, type, lecturer, link}, key) => (
                  <Flex
                    key={key}
                    width={[
                      '100%',
                      '100%',
                      '100%',
                      '100%',
                      '100%',
                      '50%',
                      '33.3333333333%',
                    ]}
                    mb="40px"
                    px="10px"
                  >
                    <BorderedBox width="100%" height="340px">
                      <Flex
                        height="100%"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Text
                          height={[
                            'auto',
                            'auto',
                            'auto',
                            'auto',
                            'auto',
                            `${37 * 4}px`,
                          ]}
                          px="14px"
                          mt="14px"
                          fontSize="24px"
                          lineHeight="37px"
                          fontWeight="900"
                        >
                          {title}
                        </Text>
                        <Flex
                          my="14px"
                          mx="14px"
                          alignItems="flex-start"
                          height="46px"
                        >
                          <Avatar
                            title={titleByType[type]}
                            fixed={
                              data[imageByTypeAndGender[type][lecturer.gender]]
                                .childImageSharp.fixed
                            }
                            mr="20px"
                          />
                          <Box alignSelf="center">
                            <Flex flexDirection="column">
                              <Text
                                fontSize="18px"
                                lineHeight="22px"
                                fontWeight="500"
                              >
                                {lecturer.name}
                              </Text>
                              {lecturer.company && (
                                <Text
                                  mt="5px"
                                  fontSize="16px"
                                  lineHeight="19px"
                                  fontWeight="400"
                                >
                                  {lecturer.company}
                                </Text>
                              )}
                              <div
                                hidden={!this.state.mainDatUrl}
                                style={{margin: '10px 0'}}
                              >
                                <a
                                  onClick={this.handleAddLike.bind(
                                    this,
                                    lecturer
                                  )}
                                  title={this.listLecturerLikes(lecturer)}
                                >
                                  🖤
                                </a>{' '}
                                {this.getParticularLikes(lecturer)} /{' '}
                                <Details>
                                  <summary>
                                    <span className="amount">
                                      🗨 {this.getParticularComments(lecturer)}
                                    </span>
                                    <span className="close">❌</span>
                                  </summary>
                                  {this.renderLecturerComments(lecturer)}
                                  <Button
                                    is="button"
                                    onClick={this.handleAddComment.bind(
                                      this,
                                      lecturer
                                    )}
                                    ml="-6px"
                                    mr="-6px"
                                    mb="-6px"
                                  >
                                    Добавить комментарий
                                  </Button>
                                </Details>
                              </div>
                            </Flex>
                          </Box>
                        </Flex>
                        {link && (
                          <Button
                            is="a"
                            href={link}
                            target="_blank"
                            ml="-6px"
                            mr="-6px"
                            mb="-6px"
                          >
                            Подробнее
                          </Button>
                        )}
                      </Flex>
                    </BorderedBox>
                  </Flex>
                ))}
              </List>
            </Container>
          </SafeAreaBox>
          <SafeAreaBox
            position="relative"
            minHeight={`${data.backgroundSecond.childImageSharp.fixed
              .height}px`}
          >
            <Image
              fixed={data.backgroundSecond.childImageSharp.fixed}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'white',
              }}
            />
            <Container is="section" id="round-table">
              <Flex
                justifyContent={[
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'flex-start',
                  'space-between',
                ]}
                flexDirection={[
                  'column',
                  'column',
                  'column',
                  'column',
                  'column',
                  'column',
                  'row',
                ]}
                mt={['80px']}
              >
                <Box>
                  <Shadow top="-40px" left="-200px">
                    <Heading
                      is="h2"
                      fontSize={['27px', '33px', '39px', '48px']}
                      lineHeight={['40px', '48px', '57px', '70px']}
                      letterSpacing="0.125em"
                      fontWeight="900"
                      mb="40px"
                    >
                      Круглый стол
                    </Heading>
                  </Shadow>
                </Box>
                <Box
                  display={[
                    'none',
                    'none',
                    'none',
                    'none',
                    'none',
                    'none',
                    'block',
                  ]}
                >
                  <Box
                    mr="20px"
                    mt="20px"
                    width="70px"
                    bg="#252525"
                    height="3px"
                    style={{float: 'left'}}
                  />
                  <Text
                    fontSize={['28px']}
                    lineHeight={['44px']}
                    fontWeight="500"
                  >
                    Подай тему,<br />
                    найди единомышленников,<br />
                    собери свой круглый стол.
                  </Text>
                </Box>
              </Flex>
              <FirestoreProvider firebase={firebase}>
                <List
                  justifyContent={[
                    'stretch',
                    'stretch',
                    'stretch',
                    'stretch',
                    'stretch',
                    'space-between',
                  ]}
                  flexWrap="wrap"
                  mt="40px"
                  mx="-10px"
                >
                  <FirestoreCollection
                    path="kdd3-round-table"
                    sort="createdAt"
                    filter={[['deletedAt', '==', null]]}
                    render={({isLoading, data}) =>
                      !isLoading &&
                      data.map(({id, authorUid, title, author}, key) => (
                        <Flex
                          key={key}
                          width={[
                            '100%',
                            '100%',
                            '100%',
                            '100%',
                            '100%',
                            '50%',
                            '33.3333333333%',
                          ]}
                          mb="40px"
                          px="10px"
                        >
                          <BorderedBox width="100%">
                            <Flex flexDirection="column">
                              <Text
                                height={[
                                  'auto',
                                  'auto',
                                  'auto',
                                  'auto',
                                  'auto',
                                  `${37 * 6}px`,
                                ]}
                                style={{
                                  overflow: 'auto',
                                }}
                                px="14px"
                                my="14px"
                                fontSize="24px"
                                lineHeight="37px"
                                fontWeight="900"
                              >
                                {title}
                              </Text>
                              <FirestoreCollection
                                path={`kdd3-round-table/${id}/votes`}
                                render={({isLoading, data: votes}) =>
                                  !isLoading && (
                                    <Flex
                                      px="14px"
                                      alignItems="center"
                                      height="54px"
                                    >
                                      <Text
                                        fontSize="28px"
                                        lineHeight="42px"
                                        fontWeight="900"
                                      >
                                        {votes.length}
                                      </Text>
                                      <Text
                                        fontSize="16px"
                                        lineHeight="19px"
                                        fontWeight="400"
                                        ml="10px"
                                      >
                                        {plural(votes.length, [
                                          'голос',
                                          'голоса',
                                          'голосов',
                                        ])}
                                      </Text>
                                    </Flex>
                                  )}
                              />
                            </Flex>
                          </BorderedBox>
                        </Flex>
                      ))}
                  />
                </List>
              </FirestoreProvider>
            </Container>
            <Container is="section" id="tickets">
              <Flex mt={['80px']}>
                <Box>
                  <Shadow color="#55E3CA" top="-40px" left="-200px">
                    <Heading
                      is="h2"
                      fontSize={['27px', '33px', '39px', '48px']}
                      lineHeight={['40px', '48px', '57px', '70px']}
                      letterSpacing="0.125em"
                      fontWeight="900"
                      mb="40px"
                    >
                      Сколько стоит билет?
                    </Heading>
                    <Text
                      fontSize={['24px', '24px', '28px']}
                      lineHeight={['30px', '30px', '34px']}
                      fontWeight="500"
                    >
                      <b>В стоимость билета входит питание:</b>
                      <br />
                      фрукты, печенье, напитки (чай, кофе, морсы, сладкая и
                      простая вода), комплексный обед.
                    </Text>
                  </Shadow>
                </Box>
              </Flex>
              <Flex mt="40px" justifyContent="space-between" flexWrap="wrap">
                {[
                  {
                    title: 'Ранняя пташка',
                    price: '1500 ₽',
                    description: '// 50 билетов',
                    soldOut: true,
                  },
                  {
                    title: 'Всё вовремя',
                    price: '2000 ₽',
                    description: '// до 1 сентября',
                  },
                  {
                    title: 'Я все проспал',
                    price: '2500 ₽',
                  },
                ].map(({title, price, description, soldOut}, key) => (
                  <Flex
                    key={key}
                    width={[1, 1, 1, 1, 1, 1 / 2, 1 / 3]}
                    maxWidth={[]}
                    flexDirection="column"
                    py="40px"
                    px="10px"
                    opacity={soldOut ? 0.3 : 1}
                  >
                    <Text
                      fontSize="48px"
                      lineHeight="58px"
                      letterSpacing="0.125em"
                      fontWeight="500"
                    >
                      {price}
                    </Text>
                    <Text
                      mt={['10px', '10px', '10px', '10px', '10px', '40px']}
                      fontSize="32px"
                      lineHeight="39px"
                      letterSpacing="0.125em"
                      fontWeight="900"
                    >
                      {title}
                    </Text>
                    {description && (
                      <Text
                        mt="20px"
                        fontSize="24px"
                        lineHeight="30px"
                        letterSpacing="0.125em"
                        fontWeight="700"
                      >
                        {description}
                      </Text>
                    )}
                  </Flex>
                ))}
              </Flex>
              <Flex flexDirection="column">
                <Text
                  fontSize={['24px']}
                  lineHeight={['34px']}
                  fontWeight="500"
                >
                  Билеты ничем не отличаются, кроме цены и количества.<br />
                  Вы можете купить любой билет на ваше усмотрение.
                </Text>
              </Flex>
              <Flex>
                <Button
                  is="a"
                  href="https://krddevdays.timepad.ru/event/763050/"
                  target="_blank"
                  mt="80px"
                  className="buy-ticket"
                >
                  Купить билет
                </Button>
              </Flex>
            </Container>
            <Container is="section">
              <Flex mt={['80px']}>
                <Box>
                  <Shadow top="-40px" left="-200px" color="#55E3CA">
                    <Heading
                      is="h2"
                      fontSize={['27px', '33px', '39px', '48px']}
                      lineHeight={['40px', '48px', '57px', '70px']}
                      letterSpacing="0.125em"
                      fontWeight="900"
                    >
                      Спонсоры и партнеры
                    </Heading>
                  </Shadow>
                </Box>
              </Flex>
              <Flex mt="40px" flexDirection="column" flexWrap="wrap">
                <Flex
                  mb="48px"
                  flexWrap={['no-wrap', 'no-wrap', 'wrap']}
                  flexDirection={['column', 'column', 'row']}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <ImageLink
                    width="256px"
                    mr={['0px', '0px', '128px']}
                    mb="48px"
                    title="Avito"
                    href="https://avito.ru"
                    src={avitoLogo}
                  />
                  <ImageLink
                    width="256px"
                    mb="48px"
                    title="Первая Мониторинговая Компания"
                    href="https://firstmk.ru"
                    src={firstmkLogo}
                  />
                </Flex>
                <Flex
                  flexWrap={['no-wrap', 'no-wrap', 'wrap']}
                  flexDirection={['column', 'column', 'row']}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <ImageLink
                    width="160px"
                    mr={['0px', '0px', '128px']}
                    mb="48px"
                    title="JetBrains"
                    href="https://jetbrains.com"
                    src={jetbrainsLogo}
                  />
                  <ImageLink
                    width="160px"
                    mr={['0px', '0px', '128px']}
                    mb="48px"
                    title="Waliot"
                    href="https://waliot.com"
                    src={waliotLogo}
                  />
                  <ImageLink
                    width="160px"
                    mb="48px"
                    title="Arkadium"
                    href="https://www.arkadium.com"
                    src={arkadiumLogo}
                  />
                </Flex>
              </Flex>
            </Container>
            <Container is="section">
              <Flex mt={['80px']}>
                <Box>
                  <Shadow top="-40px" left="-200px" color="#55E3CA">
                    <Heading
                      is="h2"
                      fontSize={['27px', '33px', '39px', '48px']}
                      lineHeight={['40px', '48px', '57px', '70px']}
                      letterSpacing="0.125em"
                      fontWeight="900"
                    >
                      Как это было в прошлом году
                    </Heading>
                  </Shadow>
                </Box>
              </Flex>
              <Flex mt="40px" flexDirection="column" flexWrap="wrap">
                <Box height={0} pb="56.25%" position="relative">
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    title="Видео Krasnodar Dev Days #2"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/_YUUlmSZYuc?rel=0&amp;showinfo=0"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </Box>
              </Flex>
            </Container>
            <Container is="section">
              <Flex mt={['80px']}>
                <Box>
                  <Shadow top="-40px" left="-200px">
                    <Heading
                      is="h2"
                      fontSize={['27px', '33px', '39px', '48px']}
                      lineHeight={['40px', '48px', '57px', '70px']}
                      letterSpacing="0.125em"
                      fontWeight="900"
                    >
                      Остались вопросы?
                    </Heading>
                  </Shadow>
                </Box>
              </Flex>
              <Flex
                mt="40px"
                alignItems={[
                  'stretch',
                  'stretch',
                  'stretch',
                  'stretch',
                  'stretch',
                  'center',
                ]}
                flexDirection="column"
                flexWrap="wrap"
              >
                <Text
                  is="a"
                  href="tel:+79183628576"
                  fontSize={['20px', '24px', '30px', '38px']}
                  lineHeight={['40px', '48px', '60px', '70px']}
                  letterSpacing="0.125em"
                  fontWeight="500"
                >
                  +7 (918) 362-85-76
                </Text>
                <Text
                  is="a"
                  href="mailto:help@krddevdays.ru"
                  fontSize={['20px', '24px', '30px', '38px']}
                  lineHeight={['40px', '48px', '60px', '70px']}
                  letterSpacing="0.125em"
                  fontWeight="500"
                >
                  help@krddevdays.ru
                </Text>
              </Flex>
            </Container>
          </SafeAreaBox>
          <SafeAreaBox bg="#FAFAFA" mt="40px">
            <Container is="footer">
              <Flex height="150px" alignItems="center">
                <Text fontSize="18px" lineHeight="22px" fontWeight={500}>
                  Krasnodar Dev Days © 2018
                </Text>
              </Flex>
            </Container>
          </SafeAreaBox>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query Image {
    backgroundFirst: file(
      absolutePath: {regex: "/src/pages/background-first.png$/"}
    ) {
      childImageSharp {
        fixed(width: 1680) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    backgroundSecond: file(
      absolutePath: {regex: "/src/pages/background-second.png$/"}
    ) {
      childImageSharp {
        fixed(width: 1680) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    designMaleImage: file(
      absolutePath: {regex: "/src/pages/design-male.png/"}
    ) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    designFemaleImage: file(
      absolutePath: {regex: "/src/pages/design-female.png/"}
    ) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    QAMaleImage: file(absolutePath: {regex: "/src/pages/qa-male.png/"}) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    QAFemaleImage: file(absolutePath: {regex: "/src/pages/qa-female.png/"}) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    managementMaleImage: file(
      absolutePath: {regex: "/src/pages/management-male.png/"}
    ) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    managementFemaleImage: file(
      absolutePath: {regex: "/src/pages/management-female.png/"}
    ) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    developmentMaleImage: file(
      absolutePath: {regex: "/src/pages/development-male.png/"}
    ) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    developmentFemaleImage: file(
      absolutePath: {regex: "/src/pages/development-female.png/"}
    ) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
