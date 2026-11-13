# Atlas Farm Taroudant — Firestore Security Specification (Phase 0 TDD)

## 1. Data Invariants

1. **Default-Deny Catch-All**: No unlisted collection or subcollection is ever readable or writable (`match /{document=**} { allow read, write: if false; }`).
2. **Verified Identity**: Every write (`create`, `update`, `delete`) requires `isSignedIn()` and `request.auth.token.email_verified == true`.
3. **Ownership & Tenant Isolation**: Every document across `/animals/{animalId}`, `/milk_records/{recordId}`, `/crop_fields/{fieldId}`, `/erp_operations/{opId}`, and `/commercial_orders/{orderId}` must contain an immutable `ownerId` matching `request.auth.uid`, and `allow list` / `allow get` enforces `resource.data.ownerId == request.auth.uid || isAdmin()`.
4. **Strict Key & Size Enforcement**: Every entity validation helper enforces `hasAll` and `hasOnly` on document keys, string `.size()` bounds matching `firebase-blueprint.json`, numeric bounds, and `createdAt == request.time`.
5. **Path Variable Hardening**: Every single-document target (`get`, `create`, `update`, `delete`) validates `isValidId(docId)` (`^[a-zA-Z0-9_\-]+$`, max 128 chars).

## 2. The "Dirty Dozen" Payloads

1. **Unauthenticated Write**: Creating `/animals/a1` with `auth == null` -> `PERMISSION_DENIED`.
2. **Unverified Email Spoof**: Creating `/animals/a1` as `idrisselghazi9@gmail.com` with `email_verified: false` -> `PERMISSION_DENIED`.
3. **Identity Spoofing (`ownerId` Mismatch)**: Creating `/animals/a1` where `ownerId: "victim-uid"` != `request.auth.uid` -> `PERMISSION_DENIED`.
4. **Shadow Field Injection**: Creating `/milk_records/m1` with an extra undeclared field `isApprovedByAdmin: true` -> `PERMISSION_DENIED` (blocked by `hasOnly`).
5. **ID Poisoning Attack**: Creating `/animals/invalid$id!@#` with forbidden characters -> `PERMISSION_DENIED` (blocked by `isValidId`).
6. **Value Poisoning on Update**: Updating `weightKg` on `/animals/a1` with a string `"heavy"` instead of a positive number -> `PERMISSION_DENIED` (blocked by `isValidAnimalRecord(incoming())`).
7. **Immutable Field Tampering**: Updating `ownerId` or `createdAt` on `/commercial_orders/o1` -> `PERMISSION_DENIED`.
8. **Forged Client Timestamp**: Creating `/crop_fields/f1` with a past or future `createdAt != request.time` -> `PERMISSION_DENIED`.
9. **String Overflow (Denial of Wallet)**: Creating `/erp_operations/op1` with a 5,000-character `title` (max 120) -> `PERMISSION_DENIED`.
10. **Cross-Tenant PII Read**: Authenticated user `uid_B` reading `/commercial_orders/o1` owned by `uid_A` -> `PERMISSION_DENIED`.
11. **Unrestricted List Scraping**: Listing `/commercial_orders` without filtering `resource.data.ownerId == request.auth.uid` -> `PERMISSION_DENIED`.
12. **Terminal State Modification**: Attempting to mutate a locked `Delivered` order's status without admin privileges -> `PERMISSION_DENIED`.
