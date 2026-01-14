import { NativeModules } from 'react-native';

interface BuildConfigModuleInterface {
  HAS_NATIVE_HEADER: boolean;
}

const BuildConfigModule = NativeModules.BuildConfigModule as BuildConfigModuleInterface;

export const HAS_NATIVE_HEADER = BuildConfigModule?.HAS_NATIVE_HEADER ?? false;
