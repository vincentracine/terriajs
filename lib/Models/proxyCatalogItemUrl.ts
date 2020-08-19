"use strict";

import UrlMixin from "../ModelMixins/UrlMixin";
import { BaseModel } from "./Model";
import UrlReference from "./UrlReference";
import isDefined from "../Core/isDefined";
import { identity } from "lodash-es";
import defaultValue from "terriajs-cesium/Source/Core/defaultValue";

/**
 * Proxies a URL associated with a catalog item, if necessary.
 * @param {CatalogItem} [catalogItem] The catalog item.
 * @param {string} url The URL.
 * @param {string} [cacheDuration] The cache duration to override catalogItem.cacheDuration.
 * @returns {string} The URL, now cached if necessary.
 */
export default function proxyCatalogItemUrl(
  catalogItem: BaseModel | UrlReference | undefined,
  url: string,
  cacheDuration?: string
) {
  const corsProxy = catalogItem?.terria?.corsProxy;
  if (!isDefined(corsProxy)) {
    return url;
  }

  if (
    !corsProxy.shouldUseProxy(url) &&
    (!UrlMixin.isMixedInto(catalogItem) || !catalogItem.forceProxy)
  ) {
    return url;
  }

  return corsProxy.getURL(
    url,
    defaultValue(
      UrlMixin.isMixedInto(catalogItem) && catalogItem.cacheDuration,
      cacheDuration
    )
  );
}