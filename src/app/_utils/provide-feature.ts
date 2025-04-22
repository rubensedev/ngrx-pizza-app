import { EnvironmentProviders } from '@angular/core';
import { FeatureSlice, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export function provideFeature(
  features: FeatureSlice<any>[] | FeatureSlice<any>,
  options?: {
    effects?: any[];
    providers?: any[];
  }
): EnvironmentProviders[] {
  const { effects = [], providers = [] } = options ?? {};

  const featuresArray = Array.isArray(features) ? features : [features];
  const stateProviders = featuresArray.map((feature) => provideState(feature));

  return [...stateProviders, provideEffects(effects), ...providers];
}
