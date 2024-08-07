export const statusRule = {
  INUSE: {
    title: 'Đang sử dụng',
    color: 'text-black'
  },
  EXPIRED: {
    title: 'Hết hạn',
    color: 'text-amber-500'
  },
  PROCESSING: {
    title: 'Chờ kích hoạt',
    color: 'text-lime-500'
  },
  LOCKED: {
    title: 'Bị khóa',
    color: 'text-red-500'
  }
}
export const statusRequest: any = {
  1: {
    status: 'WAIT_APPROVE',
    title: 'Xin duyệt hợp đồng',
    description: 'Yêu cầu xin trình duyệt hợp đồng'
  },
  2: { status: 'APPROVED', title: 'Xác nhận duyệt hợp đồng', description: 'Xác nhận duyệt hợp đồng' },
  3: { status: 'APPROVE_FAIL', title: 'Từ chối duyệt hợp đồng', description: 'Từ chối duyệt hợp đồng' },
  4: { status: 'WAIT_SIGN_A', title: 'Xác nhận xin ký hợp đồng', description: 'Yêu cầu xin trình kí hợp đồng' },
  5: { status: 'SIGN_A_OK', title: 'Xác nhận ký hợp đồng', description: 'Xác nhận ký hợp đồng' },
  6: { status: 'SIGN_A_FAIL', title: 'Từ chối ký hợp đồng', description: 'Từ chối ký hợp đồng' },
  7: {
    status: 'WAIT_SIGN_B',
    title: 'Xác nhận trao đổi và ký hợp đồng',
    description: 'Yêu cầu xác nhận trao đổi và xin ký hợp đồng'
  },
  8: { status: 'SIGN_B_OK', title: 'Xác nhận ký hợp đồng', description: 'Xác nhận ký hợp đồng' },
  9: { status: 'SIGN_B_FAIL', title: 'Từ chối ký hợp đồng', description: 'Từ chối ký hợp đồng' },
  10: { status: 'NEW', title: 'Tạo mới hợp đồng', description: 'Bạn đã tạo mới hợp đồng thành công' }
}
