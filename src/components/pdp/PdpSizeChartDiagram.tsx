import COLORS from '@/constants/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {
  Line,
  Path,
  Rect,
  Text as SvgText,
} from 'react-native-svg';

const DIAGRAM_WIDTH = 220;
const DIAGRAM_HEIGHT = 200;
const TEAL = COLORS.splash;

const PdpSizeChartDiagram: React.FC = () => {
  return (
    <View style={styles.wrap}>
      <Svg
        width={DIAGRAM_WIDTH}
        height={DIAGRAM_HEIGHT}
        viewBox="0 0 220 200"
        accessibilityLabel="T-shirt measurement diagram">
        <Path
          d="M72 38 L55 52 L48 78 L44 168 L176 168 L172 78 L165 52 L148 38 L130 48 L110 42 L90 48 Z"
          stroke={COLORS.black}
          strokeWidth={1.5}
          fill="none"
        />
        <Path
          d="M90 48 L72 38 L148 38 L130 48"
          stroke={COLORS.black}
          strokeWidth={1.5}
          fill="none"
        />

        <Line
          x1="110"
          y1="48"
          x2="110"
          y2="168"
          stroke={TEAL}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <Line
          x1="58"
          y1="95"
          x2="162"
          y2="95"
          stroke={TEAL}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <Line
          x1="148"
          y1="48"
          x2="172"
          y2="118"
          stroke={TEAL}
          strokeWidth={1}
          strokeDasharray="4 3"
        />

        <MarkerBadge x={96} y={108} letter="A" />
        <MarkerBadge x={168} y={86} letter="B" />
        <MarkerBadge x={178} y={72} letter="C" />
      </Svg>
    </View>
  );
};

type MarkerBadgeProps = {
  x: number;
  y: number;
  letter: string;
};

function MarkerBadge({x, y, letter}: MarkerBadgeProps): React.JSX.Element {
  return (
    <>
      <Rect x={x} y={y} width={18} height={18} fill={TEAL} />
      <SvgText
        x={x + 9}
        y={y + 13}
        fill={COLORS.white}
        fontSize={11}
        fontWeight="600"
        textAnchor="middle">
        {letter}
      </SvgText>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});

export default React.memo(PdpSizeChartDiagram);
