import FastImage, {type FastImageProps, type Source} from '@d11/react-native-fast-image';
import React from 'react';
import type {ImageRequireSource} from 'react-native';

/**
 * Remote image descriptor (FastImage disk/memory cache applies to URIs).
 * Local assets: pass `require('…')` (number) as `source` instead.
 */
export type CachedImageRemoteSource = Source & {uri: string};

export type CachedImageSource = CachedImageRemoteSource | ImageRequireSource;

export type CachedImageProps = Omit<FastImageProps, 'source'> & {
  source: CachedImageSource;
};

function isRemoteSource(source: CachedImageSource): source is CachedImageRemoteSource {
  return typeof source === 'object' && source !== null && 'uri' in source && typeof source.uri === 'string';
}

/**
 * Thin wrapper around FastImage (`@d11/react-native-fast-image`) so screens pass one prop shape:
 * - Remote: `{ uri, headers?, priority?, cache? }`
 * - Local: `require('asset.png')`
 */
const CachedImage: React.FC<CachedImageProps> = ({
  source,
  resizeMode = FastImage.resizeMode.cover,
  ...rest
}) => {
  const resolved: FastImageProps['source'] = isRemoteSource(source)
    ? {
        uri: source.uri,
        headers: source.headers,
        priority: source.priority ?? FastImage.priority.normal,
        cache: source.cache ?? FastImage.cacheControl.immutable,
      }
    : source;

  return <FastImage {...rest} resizeMode={resizeMode} source={resolved} />;
};

export default React.memo(CachedImage);
