import React from 'react';
import { mount, shallow } from 'enzyme';

import PlayerControls, { Control } from 'components/Player/PlayerControls';
import { mockQueue } from 'utils';

const player = {
  queue: mockQueue,
  playing: false,
  queueIndex: null,
  currentTrack: mockQueue[0],
  time: 0,
  pausedAt: null,
  intervalId: null,
  message: null
};

describe('PlayerControls desktop view', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <PlayerControls
        player={player}
        playerIsOpen={false}
        userAgentIsMobile={false}
        handlePlayTrack={jest.fn()}
        handlePauseTrack={jest.fn()}
        handlePlayNext={jest.fn()}
        handlePlayPrev={jest.fn()}
        handlePlayerToggle={jest.fn()}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should have 4 controls', () => {
    expect(wrapper.find(Control).length).toBe(4);
  });
});

describe('PlayerControls mobile view', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <PlayerControls
        player={player}
        playerIsOpen={false}
        userAgentIsMobile={true}
        handlePlayTrack={jest.fn()}
        handlePauseTrack={jest.fn()}
        handlePlayNext={jest.fn()}
        handlePlayPrev={jest.fn()}
        handlePlayerToggle={jest.fn()}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should have 4 controls', () => {
    expect(wrapper.find(Control).length).toBe(4);
  });
});
