import { TopicInfo, TopicId } from '../types';

export const TOPICS: Record<TopicId, TopicInfo> = {
  online_csalasok: {
    id: 'online_csalasok',
    name: 'Online Csalások és Adathalászat',
    shortName: 'Online Csalások',
    description: 'Hamis SMS-ek, banki adathalászat, gyanús webáruházak és nyereményjátékok felismerése.',
    iconName: 'ShieldAlert',
    emoji: '🎣', // Phishing / scam hook
    color: '#EF4444', // Red / Rose
    bgClass: 'bg-rose-500',
    borderClass: 'border-rose-400',
    textClass: 'text-rose-400',
    gradient: 'from-rose-500 to-red-600',
  },
  kiberbiztonsag: {
    id: 'kiberbiztonsag',
    name: 'Kiberbiztonság & Jelszóvédelem',
    shortName: 'Kiberbiztonság',
    description: 'Erős jelszavak, kétlépcsős azonosítás, vírusvédelem és eszközök védelme.',
    iconName: 'LockKeyhole',
    emoji: '🔐', // Cyber security / lock key
    color: '#06B6D4', // Cyan
    bgClass: 'bg-cyan-500',
    borderClass: 'border-cyan-400',
    textClass: 'text-cyan-400',
    gradient: 'from-cyan-500 to-blue-600',
  },
  kozossegi_media: {
    id: 'kozossegi_media',
    name: 'Biztonságos Közösségi Média',
    shortName: 'Közösségi Média',
    description: 'Adatvédelem TikTokon, Instagramon, személyes adatok és fotók körültekintő megosztása.',
    iconName: 'Share2',
    emoji: '📱', // Smartphone / social media
    color: '#8B5CF6', // Purple / Violet
    bgClass: 'bg-violet-500',
    borderClass: 'border-violet-400',
    textClass: 'text-violet-400',
    gradient: 'from-violet-500 to-purple-600',
  },
  drogprevencio: {
    id: 'drogprevencio',
    name: 'Drog & Egészséges Életmód',
    shortName: 'Drog & Egészség',
    description: 'Bódító szerek, dohányzás, energiaitalok és designer szerek veszélyei, nemet mondás készsége.',
    iconName: 'HeartHandshake',
    emoji: '🍏', // Health & prevention
    color: '#10B981', // Emerald green
    bgClass: 'bg-emerald-500',
    borderClass: 'border-emerald-400',
    textClass: 'text-emerald-400',
    gradient: 'from-emerald-500 to-teal-600',
  },
  online_zaklatas: {
    id: 'online_zaklatas',
    name: 'Online Zaklatás & Cyberbullying',
    shortName: 'Online Zaklatás',
    description: 'Kirekesztés a csoportokban, gúnyolódás, segítségkérés és kiállás a társainkért.',
    iconName: 'MessageSquareWarning',
    emoji: '🛑', // Stop cyberbullying
    color: '#F59E0B', // Amber / Orange
    bgClass: 'bg-amber-500',
    borderClass: 'border-amber-400',
    textClass: 'text-amber-400',
    gradient: 'from-amber-500 to-orange-600',
  },
  egyeb_bunmegelozes: {
    id: 'egyeb_bunmegelozes',
    name: 'Általános Bűnmegelőzés & 112',
    shortName: 'Bűnmegelőzés & 112',
    description: '112-es segélyhívó helyes használata, kerékpárvédelem, vagyonbiztonság és közlekedés.',
    iconName: 'ShieldCheck',
    emoji: '🚨', // Emergency / police light
    color: '#3B82F6', // Blue / Police Gold-Blue
    bgClass: 'bg-blue-600',
    borderClass: 'border-blue-400',
    textClass: 'text-blue-400',
    gradient: 'from-blue-600 to-indigo-700',
  },
};

export const TOPIC_LIST: TopicInfo[] = [
  TOPICS.online_csalasok,
  TOPICS.kiberbiztonsag,
  TOPICS.kozossegi_media,
  TOPICS.drogprevencio,
  TOPICS.online_zaklatas,
  TOPICS.egyeb_bunmegelozes,
];
