import React from 'react'
import Truncated from './Truncated'

export default {
  component: Truncated,
  title: 'Truncated',
  excludeStories: ['text'],
}

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis rhoncus risus, ut faucibus dui. Aenean bibendum dui et finibus euismod. Nullam luctus nisl at ipsum faucibus, sed volutpat metus ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent dictum ligula at sollicitudin venenatis. Fusce facilisis tincidunt accumsan. Vestibulum vitae efficitur urna. Maecenas aliquam accumsan scelerisque. Morbi molestie, justo sed pretium gravida, erat nulla mattis turpis, non aliquam sapien orci vel arcu. Curabitur id mauris a odio pharetra varius eget quis ipsum. Donec ipsum tellus, bibendum quis maximus eu, facilisis vitae nibh. Maecenas euismod mauris at orci eleifend efficitur.'

export const empty = () => <Truncated>{text}</Truncated>
export const oneLine = () => <Truncated lines={1}>{text}</Truncated>
export const twoLines = () => <Truncated lines={2}>{text}</Truncated>
export const nineLines = () => <Truncated lines={9}>{text}</Truncated>
