/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import Starrate from 'react-minor-ui'
import { useDispatch, useSelector } from 'react-redux'
import Card from './common/Card/Card'
import CardContent from './common/Card/CardContent'
import CardImage from './common/Card/CardImage'
import CardTitle from './common/Card/CardTitle'
import sampleArtImage from './common/Card/sample-art.png'
import FlexBox from './common/Flexbox'
import Truncated from './common/Truncated'
import { setThemeID } from './theming/actions'
import { selectTheming } from './theming/selectors'

const longContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis rhoncus risus, ut faucibus dui. Aenean bibendum dui et finibus euismod. Nullam luctus nisl at ipsum faucibus, sed volutpat metus ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent dictum ligula at sollicitudin venenatis. Fusce facilisis tincidunt accumsan. Vestibulum vitae efficitur urna. Maecenas aliquam accumsan scelerisque. Morbi molestie, justo sed pretium gravida, erat nulla mattis turpis, non aliquam sapien orci vel arcu. Curabitur id mauris a odio pharetra varius eget quis ipsum. Donec ipsum tellus, bibendum quis maximus eu, facilisis vitae nibh. Maecenas euismod mauris at orci eleifend efficitur.'

const Example = () => {
  const dispatch = useDispatch()
  const themeID = useSelector(selectTheming)

  const onThemeToggleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    dispatch(setThemeID({ id: themeID === 'white' ? 'black' : 'white' }))
  }

  return (
    <div css={centeredBody}>
      <FlexBox
        direction="column"
        alignItems="center"
        justify="center"
        css={fullHeight}
      >
        <Starrate maxRating={4} size="huge" />

        <Card>
          <CardImage src={sampleArtImage} height="100px" alt="Sample Art" />
          <CardContent>
            <CardTitle subtitle="Sample subtitle" actions={<Starrate />}>
              Sample title of a row
            </CardTitle>
            <Truncated lines={2}>{longContent}</Truncated>
          </CardContent>
        </Card>

        <br />
        <button onClick={onThemeToggleClick}>Toggle Theme</button>
      </FlexBox>
    </div>
  )
}

const centeredBody = css`
  margin: 0 auto;
  max-width: 920px;
`

const fullHeight = css`
  min-height: 100vh;
`

export default Example
