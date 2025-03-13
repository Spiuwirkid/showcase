// Ini hanya shim yang aman untuk lingkungan browser
export default {
  compare: async () => false,
  hash: async () => 'dummy-hash'
}; 