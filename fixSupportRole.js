const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function fixSupportRole() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // 输出所有用户的邮箱和角色
  const allUsers = await User.find();
  console.log('所有用户:');
  allUsers.forEach(u => console.log(`邮箱: ${u.email}, 角色: ${u.role}`));

  // 查找所有疑似 support 用户
  const users = await User.find({ $or: [
    { email: /s@/i },
    { email: /support/i }
  ] });
  console.log('修改前:', users.map(u => ({ email: u.email, role: u.role })));

  // 强制把这些用户的 role 改为 support
  const result = await User.updateMany({ $or: [
    { email: /s@/i },
    { email: /support/i }
  ] }, { $set: { role: 'support' } });

  // 再查一遍确认
  const after = await User.find({ $or: [
    { email: /s@/i },
    { email: /support/i }
  ] });
  console.log('修改后:', after.map(u => ({ email: u.email, role: u.role })));
  console.log('Update result:', result);
  await mongoose.disconnect();
}

fixSupportRole().catch(err => {
  console.error('Error:', err);
  process.exit(1);
}); 