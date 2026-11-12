// Throwaway: deliberate code injection to test the CodeQL merge rule. Never merged.
export function run(): unknown {
  return eval(window.location.hash.slice(1));
}
