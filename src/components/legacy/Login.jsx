export function Login() {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">로그인</h1>

        <div className="space-y-6">
          <div>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-400"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-400"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div>
            <button className="w-full bg-blue-500 text-white py-2 font-semibold hover:bg-blue-600 transition-colors cursor-pointer">
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
