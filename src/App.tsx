/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import Starrate from 'react-minor-ui'
import FlexBox from './common/Flexbox'
import Row from './common/Row/Row'
import RowContent from './common/Row/RowContent'
import RowImage from './common/Row/RowImage'
import RowTitle from './common/Row/RowTitle'
import sampleArtImage from './common/Row/sample-art.png'
import ThemeProvider from './common/theming/ThemeProvider'
import useThemeStore from './common/theming/use-theme-store'
import Truncated from './common/Truncated'

const longContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis rhoncus risus, ut faucibus dui. Aenean bibendum dui et finibus euismod. Nullam luctus nisl at ipsum faucibus, sed volutpat metus ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent dictum ligula at sollicitudin venenatis. Fusce facilisis tincidunt accumsan. Vestibulum vitae efficitur urna. Maecenas aliquam accumsan scelerisque. Morbi molestie, justo sed pretium gravida, erat nulla mattis turpis, non aliquam sapien orci vel arcu. Curabitur id mauris a odio pharetra varius eget quis ipsum. Donec ipsum tellus, bibendum quis maximus eu, facilisis vitae nibh. Maecenas euismod mauris at orci eleifend efficitur.'

const App = () => {
  const [theme, toggleTheme] = useThemeStore()

  const onThemeToggleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    toggleTheme()
  }

  return (
    <ThemeProvider theme={theme}>
      <div css={centeredBody}>
        <FlexBox
          direction="column"
          alignItems="center"
          justify="center"
          css={fullHeight}
        >
          <Starrate maxRating={4} size="huge" />

          <Row>
            <RowImage src={sampleArtImage} height="100px" alt="Sample Art" />
            <RowContent>
              <RowTitle subtitle="Sample subtitle" actions={<Starrate />}>
                Sample title of a row
              </RowTitle>
              <Truncated lines={2}>{longContent}</Truncated>
            </RowContent>
          </Row>

          <br />
          <button onClick={onThemeToggleClick}>Toggle Theme</button>
        </FlexBox>
      </div>
    </ThemeProvider>
  )
}

const centeredBody = css`
  margin: 0 auto;
  max-width: 920px;
`

const fullHeight = css`
  min-height: 100vh;
`

export default App
