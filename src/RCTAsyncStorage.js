const {NativeModules, TurboModuleRegistry} = require('react-native');
const shouldFallbackToLegacyNativeModule = require('./shouldFallbackToLegacyNativeModule');

let RCTAsyncStorage =
  NativeModules.PlatformLocalStorage || // Support for external modules, like react-native-windows
  NativeModules.RNC_AsyncSQLiteDBStorage ||
  NativeModules.RNCAsyncStorage;

if (!RCTAsyncStorage && shouldFallbackToLegacyNativeModule()) {
  // TurboModuleRegistry falls back to NativeModules so we don't have to try go
  // assign NativeModules' counterparts if TurboModuleRegistry would resolve
  // with undefined.
  if (TurboModuleRegistry) {
    RCTAsyncStorage = TurboModuleRegistry.get('AsyncSQLiteDBStorage') || TurboModuleRegistry.get('AsyncLocalStorage');
  } else {
    RCTAsyncStorage = NativeModules.AsyncSQLiteDBStorage || NativeModules.AsyncLocalStorage;
  }
}

export default RCTAsyncStorage;
