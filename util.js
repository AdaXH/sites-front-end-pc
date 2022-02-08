/**
 * 从proceee获取参数
 * @param {String} key
 * @returns {String}
 */
 exports.getParam = (getKey) => {
    const args = process.argv;
    for (const item of args) {
      if (/=/.test(item)) {
        const [key, value] = item.split('=');
        if (getKey === key) return value;
      }
    }
  }