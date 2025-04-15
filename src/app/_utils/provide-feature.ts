import { EnvironmentProviders } from '@angular/core';

import { FeatureSlice, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export function provideFeature<T = unknown>(
  feature: FeatureSlice<T>,
  options?: {
    effects?: any[];
    providers?: any[];
  }
): EnvironmentProviders[] {
  const { effects = [], providers = [] } = options ?? {};

  return [provideState(feature), provideEffects(effects), ...providers];
}
